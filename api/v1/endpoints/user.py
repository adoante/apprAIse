import database.sql_helper as database

from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

@router.get("/")
def read_all_users() -> dict[str, List[database.User]]:
    users = database.get_all_users()

    if not users:
        raise HTTPException(status_code = 404, detail = "Users not found.")

    return {"users": users}

# get specific user by id
@router.get("/{user_id}")
def read_user(user_id: int) -> database.User:
    user = database.get_user(user_id)

    if user == None:
        raise HTTPException(status_code = 404, detail = "User not found.")
    
    return user