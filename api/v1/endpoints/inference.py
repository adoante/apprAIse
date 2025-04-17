import io
from PIL import Image
from fastapi import Depends, APIRouter, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
from typing import List, Annotated
import qai_hub as hub
import database.sql_helper as database
from sqlmodel import Session
import os
from .auth import get_current_active_user

router = APIRouter()

@router.post("/")
def inference_image(
    current_user: Annotated[database.User, Depends(get_current_active_user)],
    image: UploadFile = File(...),
) -> dict[str, List]:
    try:
        with Session(database.engine) as session:
            config_file_path = os.path.join("~/.qai_hub/", f"{current_user.id}.ini")
            os.environ['QAIHUB_CLIENT_INI'] = config_file_path

            devices = hub.get_devices()

            return {"devices": devices}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
