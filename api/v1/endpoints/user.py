import database.sql_helper as database
import textwrap
import os
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

@router.put("/username")
def update_username(
	current_user: Annotated[database.User, Depends(get_current_active_user)],
	username: str = Form(...),
) -> dict[str, str]:
	old_username = current_user.user_name

	if database.get_user_by_username(username):
		raise HTTPException(status_code = 409, detail = "Username taken.")
	
	try:
		with Session(database.engine) as session:
			current_user.user_name = username
			session.add(current_user)
			session.commit()
	except:
		raise HTTPException(status_code = 500, detail = "Failed to update username.")
	
	return {"message": f"Username changed from {old_username} to {username}"}

@router.put("/firstname")
def update_firstname(
	current_user: Annotated[database.User, Depends(get_current_active_user)],
	firstname: str = Form(...),
) -> dict[str, str]:
	old_firstname = current_user.first_name
	
	try:
		with Session(database.engine) as session:
			current_user.first_name = firstname
			session.add(current_user)
			session.commit()
	except:
		raise HTTPException(status_code = 500, detail = "Failed to update firstname.")
	
	return {"message": f"Firstname changed from {old_firstname} to {firstname}"}

@router.put("/lastname")
def update_lastname(
	current_user: Annotated[database.User, Depends(get_current_active_user)],
	lastname: str = Form(...),
) -> dict[str, str]:
	old_lastname = current_user.last_name
	
	try:
		with Session(database.engine) as session:
			current_user.last_name = lastname
			session.add(current_user)
			session.commit()
	except:
		raise HTTPException(status_code = 500, detail = "Failed to update lastname.")
	
	return {"message": f"Lastname changed from {old_lastname} to {lastname}"}

@router.put("/email")
def update_email(
	current_user: Annotated[database.User, Depends(get_current_active_user)],
	email: str = Form(...),
) -> dict[str, str]:
	old_email = current_user.email
	
	try:
		validate_email(email)
	except:
		raise HTTPException(status_code=400, detail="Bad email.")

	try:
		with Session(database.engine) as session:
			current_user.email = email
			session.add(current_user)
			session.commit()
	except:
		raise HTTPException(status_code = 500, detail = "Failed to update email.")
	
	return {"message": f"Email changed from {old_email} to {email}"}

@router.put("/qai-hub-token")
def update_qai_token(
	current_user: Annotated[database.User, Depends(get_current_active_user)],
	qai_hub_token: str = Form(...),
) -> dict[str, str]:
	old_qai_hub_token = current_user.qai_hub_api_token

	try:
		with Session(database.engine) as session:
			current_user.qai_hub_api_token = qai_hub_token
			session.add(current_user)
			session.commit()

			config_data = textwrap.dedent(f"""\
				[api]
				api_token = {current_user.qai_hub_api_token}
				api_url = https://app.aihub.qualcomm.com
				web_url = https://app.aihub.qualcomm.com
				verbose = True
			""")


			config_dir = os.path.expanduser("~/.qai_hub/")
			os.makedirs(config_dir, exist_ok=True)

			config_file_path = os.path.join(config_dir, f"{current_user.id}.ini")
			with open(config_file_path, 'w') as config_file:
				config_file.write(config_data)

	except Exception as e:
		raise HTTPException(status_code=500, detail=f"Failed to update QAI Hub Token: {str(e)}")

	if old_qai_hub_token:
		return {"message": f"QAI Hub Token changed from {old_qai_hub_token} to {qai_hub_token}"}
	
	return {"message": f"QAI Hub Token changed from NULL to {qai_hub_token}"}

@router.put("/password")
def update_password(
	current_user: Annotated[database.User, Depends(get_current_active_user)],
	password: str = Form(...),
) -> dict[str, str]:
	
	try:
		hashed_password = get_password_hash(password)
		with Session(database.engine) as session:
			current_user.password_hash = hashed_password
			session.add(current_user)
			session.commit()
	except:
		raise HTTPException(status_code = 500, detail = "Failed to update password.")
	
	return {"message": "Password has been updated."}

@router.put("/disable")
def update_password(
	current_user: Annotated[database.User, Depends(get_current_active_user)],
) -> dict[str, str]:
	
	try:
		with Session(database.engine) as session:
			current_user.disabled = True
			session.add(current_user)
			session.commit()
	except:
		raise HTTPException(status_code = 500, detail = "Failed to disable user account.")
	
	return {"message": "User account has been disabled."}