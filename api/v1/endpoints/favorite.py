import database.sql_helper as database

from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/")
def read_all_favorite():
    return {"message": "Implementation Coming Soon!"}

# get specific favorites by favorites id
@router.get("/{favorites_id}")
def read_favorite(favorites_id: int) -> database.Favorite:
    favorite = database.get_favorite(favorites_id)
    
    if favorite == None:
        raise HTTPException(status_code = 404, detail = "Favorite not found.")
    
    return favorite