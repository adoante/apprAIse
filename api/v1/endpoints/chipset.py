import database.sql_helper as database

from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/")
def read_all_chipset():
    return {"message": "Implementation Coming Soon!"}

# get specific chipset by chipset id
@router.get("/{chipset_id}")
def read_chipset(chipset_id: int) -> database.Chipset:
    chipset = database.get_chipset(chipset_id)
    
    if chipset == None:
        raise HTTPException(status_code = 404, detail = "Chipset not found.")
    
    return chipset