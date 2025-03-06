from database.sql_helper import *

# Test get_user()
# with Session(engine) as session:
# 	user = User(
# 		user_id=0,
# 		user_name="testUser",
# 		first_name="test",
# 		last_name="user",
# 		email="test@user.com",
# 		password_hash="hashed-password",
# 		qai_hub_api_token="qai-api-token",
# 		customization_id=None)
# 	session.add(user)
# 	session.commit()
# print(get_user(0))

# Test get_customization()
# with Session(engine) as session:
# 	customization = Customization(customization_id=0)
# 	session.add(customization)
# 	session.commit()
# print(get_customization(0))

# Test get_favorite()
# with Session(engine) as session:
# 	favorite = Favorite(favorites_id=0, user_id=0, model_id=0)
# 	session.add(favorite)
# 	session.commit()
# print(get_favorite(0))

# Test get_chipset()
with Session(engine) as session:
	chipset = Chipset(chipset_id=0, name="chipset-name", manufacturer="man", version="1.0")
	session.add(chipset)
	session.commit()
print(get_chipset(0))
