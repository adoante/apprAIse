from database.database_init import *
from sqlmodel import Session, select

# Get all data from specific data entry by ID

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

# Get all data from specific favorite by FAVORITE_ID
def get_favorite(favorites_id: int):
	with Session(engine) as session:
		statement = select(Favorite).where(Favorite.favorites_id == favorites_id)
		favorite = session.exec(statement).first()
	return favorite

# Get all data from specific chipset by CHIPSET_ID
def get_chipset(chipset_id: int):
	with Session(engine) as session:
		statement = select(Chipset).where(Chipset.chipset_id == chipset_id)
		chipset = session.exec(statement).first()
	return chipset

# Get all data from specific model by MODEL_ID
def get_model(model_id: int):
	with Session(engine) as session:
		statement = select(Model).where(Model.model_id == model_id)
		model = session.exec(statement).first()
	return model

# Get all data from specific device by DEVICE_ID
def get_device(device_id: int):
	with Session(engine) as session:
		statement = select(Device).where(Device.device_id == device_id)
		device = session.exec(statement).first()
	return device