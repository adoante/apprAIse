from database.sql_helper import *

# Test get_user()
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