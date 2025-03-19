import database.sql_helper as database

from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/")
def read_all_customization():
    return {"message": "Implementation Coming Soon!"}

# get specific customization by customization id
@router.get("/{customization_id}")
def read_customization(customization_id: int) -> database.Customization:
    customization = database.get_customization(customization_id)

    if customization == None:
        raise HTTPException(status_code = 404, detail = "Customization not found.")
    
    return customization