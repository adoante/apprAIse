import database.sql_helper as database

from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/")
def read_all_model():
    return {"message": "Implementation Coming Soon!"}

# get specific model by chipset id
@router.get("/{model_id}")
def read_model(model_id: int) -> database.Model:
    model = database.get_model(model_id)
    
    if model == None:
        raise HTTPException(status_code = 404, detail = "Model not found.")
    
    return model