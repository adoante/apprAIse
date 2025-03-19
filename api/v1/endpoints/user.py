import database.sql_helper as database

from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/")
def read_all_users():
    return {"message": "Implementation Coming Soon!"}

# get specific user by id
@router.get("/{user_id}")
def read_user(user_id: int) -> database.User:
    user = database.get_user(user_id)

    if user == None:
        raise HTTPException(status_code = 404, detail = "User not found.")
    
    return user