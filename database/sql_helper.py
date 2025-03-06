from database.database_init import engine, User
from sqlmodel import Session, select

def get_user(user_id: int):
	with Session(engine) as session:
		statement = select(User).where(User.user_id == user_id)
		user = session.exec(statement).first()
	return user

# Tests

with Session(engine) as session:
	user = User(
		user_id=0,
		user_name="testUser",
		first_name="test",
		last_name="user",
		email="test@user.com",
		password_hash="hashed-password",
		qai_hub_api_token="qai-api-token",
		customization_id=None)
	session.add(user)
	session.commit()

print(get_user(0))