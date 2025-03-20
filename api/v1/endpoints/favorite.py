import database.sql_helper as database

from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

@router.get("/")
def read_all_favorite() -> dict[str, List[database.Favorite]]:
    favorites = database.get_all_favorites()

    if not favorites:
        raise HTTPException(status_code = 404, detail = "Favorites not found.")

    return {"favorites": favorites}

# get specific favorites by favorites id
@router.get("/{favorites_id}")
def read_favorite(favorites_id: int) -> database.Favorite:
    favorite = database.get_favorite(favorites_id)
    
    if favorite == None:
        raise HTTPException(status_code = 404, detail = "Favorite not found.")
    
    return favorite