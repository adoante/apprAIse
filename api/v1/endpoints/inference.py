import io
import os
import json
import h5py
import urllib.request
import numpy as np
from PIL import Image
from typing import List, Annotated
from fastapi import Depends, APIRouter, HTTPException, File
from fastapi.responses import JSONResponse
from sqlmodel import Session, SQLModel
import qai_hub as hub
import database.sql_helper as database
from .auth import get_current_active_user

from concurrent.futures import ProcessPoolExecutor
import functools

router = APIRouter()

class PredictionResponse(SQLModel):
	predicted_class: int
	predicted_label: str
	top5_labels: List[str]
	top5_probabilities: List[float]

def softmax(x):
	return np.exp(x) / np.sum(np.exp(x), axis=1, keepdims=True)

def run_inference(image_bytes: bytes, user_id: str) -> PredictionResponse:
	config_file_path = os.path.join("~/.qai_hub/", f"{user_id}.ini")
	os.environ['QAIHUB_CLIENT_INI'] = config_file_path

	img = Image.open(io.BytesIO(image_bytes))
	img = img.resize((224, 224))
	image_array = np.array(img).astype(np.float32) / 255.0
	image_array = np.expand_dims(image_array, axis=0)

	BASE_DIR = os.path.dirname(os.path.abspath(__file__))
	model_path = os.path.join(BASE_DIR, "squeezenet1_1_quantized.tflite")

	inference_job = hub.submit_inference_job(
		model=model_path,
		device=hub.Device("Samsung Galaxy S24 (Family)"),
		inputs={"image_tensor": [image_array]}
	)

	dataset_file = os.path.join(BASE_DIR, f"{user_id}_inference.h5")
	output_file = inference_job.download_output_data(dataset_file)

	with h5py.File(output_file, "r") as f:
		dataset_path = "data/0/batch_0"
		if dataset_path in f:
			data = f[dataset_path][()]
		else:
			raise HTTPException(status_code=404, detail="Dataset not found in the output file")

	os.remove(dataset_file)

	probabilities = softmax(data)

	imagenet_class_index_url = "https://storage.googleapis.com/download.tensorflow.org/data/imagenet_class_index.json"
	with urllib.request.urlopen(imagenet_class_index_url) as url:
		class_idx = json.loads(url.read().decode())

	predicted_class = int(np.argmax(probabilities, axis=1)[0])
	predicted_label = class_idx[str(predicted_class)][1]

	top5_classes = np.argsort(probabilities[0], axis=0)[-5:]
	top5_labels = [class_idx[str(class_index)][1] for class_index in top5_classes]
	top5_prop = [round(probabilities[0][class_index] * 100, 2) for class_index in top5_classes]

	return PredictionResponse(
		predicted_class=predicted_class,
		predicted_label=predicted_label,
		top5_labels=top5_labels,
		top5_probabilities=top5_prop
	)

executor = ProcessPoolExecutor()

@router.post("/")
def inference_image(
	current_user: Annotated[database.User, Depends(get_current_active_user)],
	image: bytes = File(...),
) -> PredictionResponse:
	try:
		with Session(database.engine) as session:
			future = executor.submit(run_inference, image, f"{current_user.id}")
			return future.result()
	except Exception as e:
		return JSONResponse(status_code=500, content={"error": str(e)})
