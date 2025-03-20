import database.sql_helper as database

from fastapi import APIRouter, HTTPException
from typing import List, Optional

router = APIRouter()

@router.get("/")
def read_all_device(
        name: Optional[str] = None 
    ) -> dict[str, List[database.Device]]:

    devices = database.get_all_devices()

    if not devices:
        raise HTTPException(status_code = 404, detail = "Devices not found.")

    # Filter by device_name
    if name:
        name = name.lower()
        devices = [
            device for device in devices
            if device.device_name.lower().find(name) > -1
        ]

    return {"devices": devices}

# get specific device by device id
@router.get("/{device_id}")
def read_device(device_id: int) -> database.Device:
    device = database.get_device(device_id)
    
    if device == None:
        raise HTTPException(status_code = 404, detail = "Device not found.")
    
    return device