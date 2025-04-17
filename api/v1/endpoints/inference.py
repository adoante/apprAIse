import io
from PIL import Image
from fastapi import APIRouter, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
from typing import List
import qai_hub as hub

# Assuming you have some model loading logic here
# Example: some_inference_model = load_your_model()

router = APIRouter()

@router.post("/")
async def inference_image(image: UploadFile = File(...)) -> dict[str, List]:
    try:
        devices = hub.get_devices()
        return {"devices": devices}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
