import database.sql_helper as database

from fastapi import Depends, APIRouter, HTTPException, Form
from typing import Annotated, Optional
from sqlmodel import Session
from email_validator import validate_email
from .auth import get_current_active_user, get_password_hash

router = APIRouter()

@router.get("/")
def read_user():
	 return {"message": "User root."}

@router.post("/register")
def add_user(
	username: str = Form(...),
	password: str = Form(...),
	firstname: str = Form(...),
	lastname: str = Form(...),
	email: str = Form(...)
) -> dict[str, str]:

	if database.get_user_by_username(username):
		raise HTTPException(status_code = 409, detail = "Username taken.")
	
	try:
		validate_email(email)
	except:
		raise HTTPException(status_code=400, detail="Bad email.")
	
	try:
		hashed_password = get_password_hash(password)
		with Session(database.engine) as session:
			user = database.User(
				user_name=username,
				first_name=firstname,
				last_name=lastname,
				email=email,
				password_hash=hashed_password,
				disabled=False
			)

			session.add(user)
			session.commit()

		return {"message": f"User: {username} created successfully."}
	except:
		raise HTTPException(status_code = 500, detail = "Failed to create new user.")

@router.get("/me/")
def read_users_me(
	current_user: Annotated[database.User, Depends(get_current_active_user)],
) -> database.User:
	return current_user