from database.database_init import *
from sqlmodel import Session, select

# Get all data from specific user by USER_ID
def get_user(user_id: int):
	with Session(engine) as session:
		statement = select(User).where(User.user_id == user_id)
		user = session.exec(statement).first()
	return user

# Get all data from specific customization  by CUSTOMIZATION_ID
def get_customization(customization_id: int):
	with Session(engine) as session:
		statement = select(Customization).where(Customization.customization_id == customization_id)
		customization = session.exec(statement).first()
	return customization