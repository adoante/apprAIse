from database.database_init import *
from sqlmodel import Session, select

# Get all data on specific user by USER_ID
def get_user(user_id: int):
	with Session(engine) as session:
		statement = select(User).where(User.user_id == user_id)
		user = session.exec(statement).first()
	return user