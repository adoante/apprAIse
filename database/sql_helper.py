import uuid
from typing import Optional
from sqlmodel import Field, Session, SQLModel, create_engine, select

class User(SQLModel, table=True):
	id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
	user_name: Optional[str] = Field(default=None, primary_key=True)
	first_name: str
	last_name: str
	email: str
	password_hash: str
	qai_hub_api_token: Optional[str] = None 
	disabled: bool
	customization_id: Optional[int] = Field(default=None, foreign_key="customization.customization_id")

class Customization(SQLModel, table=True):
	customization_id: Optional[int] = Field(default=None, primary_key=True)
	favorite_id: Optional[int]= Field(default=None, foreign_key="favorite.favorites_id")

class Favorite(SQLModel,	 table=True):
	favorites_id: Optional[int] = Field(default=None, primary_key =True)
	user_id: int
	model_id: Optional[int] = Field(default=None, foreign_key="model.model_id")

class Chipset(SQLModel, table=True):
	chipset_id:Optional[int] = Field(default=None, primary_key=True)
	chipset_name: str
	manufacturer: str
	version: str

class Model(SQLModel, table=True):
	model_id: Optional[int] = Field(default=None, primary_key=True)
	model_name: str
	github_link: str
	hugging_face_link: str
	research_paper_link: str
	qai_hub_link: str
	model_end_point: str
	input_resolution: str
	parameters: float # M - Million
	model_size: float # MB - Mega Byte
	model_img:str
	short_desc:str
	long_desc:str


class Device(SQLModel, table=True):
	device_id: Optional[int] = Field(default=None, primary_key=True)
	device_name: str
	device_industry: str
	device_company: str
	chipset_id: Optional[int] = Field(default=None, foreign_key="chipset.chipset_id")

class Benchmark(SQLModel, table=True):
	benchmark_id: Optional[int] = Field(default=None, primary_key=True)
	accuracy_top1: float
	accuracy_top5: float
	inference_time: float
	memory_usage: int
	npu_layers: int
	device_id: Optional[int] = Field(default=None, foreign_key="device.device_id")
	model_id: Optional[int] = Field(default=None, foreign_key="model.model_id")
	library_id: Optional[int] = Field(default=None, foreign_key="library.library_id")

class Library(SQLModel, table=True):
	library_id: Optional[int] = Field(default=None, primary_key=True)
	library_name: str

engine = create_engine("sqlite:///database.db")

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

# Get all data from specific benchmark by BENCHMARK_ID
def get_benchmark(benchmark_id: int):
	with Session(engine) as session:
		statement = select(Benchmark).where(Benchmark.benchmark_id == benchmark_id)
		benchmark = session.exec(statement).first()
	return benchmark

# Get all data from specific device by LIBRARY_ID
def get_library(library_id: int):
	with Session(engine) as session:
		statement = select(Library).where(Library.library_id == library_id)
		library = session.exec(statement).first()
	return library

# Get ALL records form each table

def get_all_benchmarks():
	with Session(engine) as session:
		statement = select(Benchmark)
		benchmarks = session.exec(statement)
		return list(benchmarks)
	
def get_all_models():
	with Session(engine) as session:
		statement = select(Model)
		models = session.exec(statement)
		return list(models)
	
def get_all_chipsets():
	with Session(engine) as session:
		statement = select(Chipset)
		chipsets = session.exec(statement)
		return list(chipsets)
	
def get_all_devices():
	with Session(engine) as session:
		statement = select(Device)
		devices = session.exec(statement)
		return list(devices)
	
def get_all_customizations():
	with Session(engine) as session:
		statement = select(Customization)
		customizations = session.exec(statement)
		return list(customizations)
	
def get_all_favorites():
	with Session(engine) as session:
		statement = select(Favorite)
		favorites = session.exec(statement)
		return list(favorites)

def get_all_users():
	with Session(engine) as session:
		statement = select(User)
		users = session.exec(statement)
		return list(users)
	
def get_all_library():
	with Session(engine) as session:
		statement = select(Library)
		libraries = session.exec(statement)
		return list(libraries)
	
# Get by name
def get_user_by_username(user_name: str):
	with Session(engine) as session:
		statement = select(User).where(User.user_name == user_name)
		user = session.exec(statement).first()
	return user

# Remove dups in DB 

def remove_duplicates():
    with Session(engine) as session:
        def dedupe(model, unique_field):
            records = session.exec(select(model)).all()
            seen = set()
            to_delete = []

            for record in records:
                value = getattr(record, unique_field, None)
                if value is None:
                    continue  # skip if field missing
                if value in seen:
                    to_delete.append(record)
                else:
                    seen.add(value)

            for record in to_delete:
                session.delete(record)
            return len(to_delete)

        total_deleted = 0
        total_deleted += dedupe(User, "user_name")
        total_deleted += dedupe(Customization, "customization_id")
        total_deleted += dedupe(Favorite, "favorites_id")
        total_deleted += dedupe(Chipset, "chipset_name")
        total_deleted += dedupe(Model, "model_name")
        total_deleted += dedupe(Device, "device_name")
        total_deleted += dedupe(Benchmark, "benchmark_id")
        total_deleted += dedupe(Library, "library_name")

        session.commit()
        print(f"✅ Removed {total_deleted} duplicate records across all tables")