import database.sql_helper as database

from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/")
def read_all_device():
    return {"message": "Implementation Coming Soon!"}


# get specific device by device id
@router.get("/{device_id}")
def read_device(device_id: int) -> database.Device:
    device = database.get_device(device_id)
    
    if device == None:
        raise HTTPException(status_code = 404, detail = "Device not found.")
    
    return device