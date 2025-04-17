import io
import numpy as np
import os
from PIL import Image
from fastapi import APIRouter, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
import qai_hub as hub
import h5py
import json
import urllib.request
from jinja2 import Environment, FileSystemLoader
from pathlib import Path

router = APIRouter()

# Softmax function
def softmax(x):
    return np.exp(x) / np.sum(np.exp(x), axis=1, keepdims=True)

# Function to render HTML results using Jinja2
def render_html(predicted_class, predicted_label, top5_labels):
    env = Environment(loader=FileSystemLoader(searchpath='./'))
    template = env.get_template('inference_template.html')  # Assumes template is in the same directory
    return template.render(
        predicted_class=predicted_class,
        predicted_label=predicted_label,
        top5_labels=top5_labels
    )

@router.post("/")
async def inference_image(image: UploadFile = File(...)):
    models = hub.get_models()
    try:
        # Load and preprocess the image
        image_bytes = await image.read()
        img = Image.open(io.BytesIO(image_bytes))  # Open the image using PIL
        img = img.resize((224, 224))  # Resize to 224x224
        image_array = np.array(img).astype(np.float32) / 255.0
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

        # Submit inference job
        inference_job = hub.submit_inference_job(
            model=hub.get_model("mqpvkrxlq"),
            device=hub.Device("Samsung Galaxy S23"),
            inputs={"image_tensor": [image_array]}
        )

        # Download output data
        output_file = inference_job.download_output_data(".")
        with h5py.File(output_file, "r") as f:
            dataset_path = "data/0/batch_0"
            if dataset_path in f:
                data = f[dataset_path][()]
            else:
                raise HTTPException(status_code=404, detail="Dataset not found in the output file")

        # Apply softmax to get probabilities
        probabilities = softmax(data)

        # Download ImageNet class labels
        imagenet_class_index_url = "https://storage.googleapis.com/download.tensorflow.org/data/imagenet_class_index.json"
        with urllib.request.urlopen(imagenet_class_index_url) as url:
            class_idx = json.loads(url.read().decode())

        # Get predicted class index and label
        predicted_class = int(np.argmax(probabilities, axis=1)[0])
        predicted_label = class_idx[str(predicted_class)][1]

        # Generate top-5 predictions
        top5_classes = np.argsort(probabilities[0], axis=0)[-5:]
        top5_labels = [f"{class_idx[str(class_index)][1]} ({probabilities[0][class_index]:.1%})" for class_index in top5_classes]

        # Return results as a JSON response
        return {
            "predicted_class": predicted_class,
            "predicted_label": predicted_label,
            "top5_labels": top5_labels
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
