from typing import Optional

from sqlmodel import Field, Session, SQLModel, create_engine


class User(SQLModel, table=True):
    user_id:Optional[int] = Field(default=None, primary_key=True)
    user_name: str
    first_name: str
    last_name: str
    email: str
    password_hash: str
    qai_hub_api_token: str
    customization_id: Optional[int] = Field(default=None, foreign_key="customization.customization_id")

class Customization(SQLModel, table=True):
    customization_id: Optional[int] = Field(default=None, primary_key=True)
    favorite_id: Optional[int]= Field(default=None, foreign_key="favorite.favorites_id")

class Favorite(SQLModel, table=True):
    favorites_id: Optional[int] = Field(default=None, primary_key =True)
    user_id: int
    model_id: Optional[int] = Field(default=None, foreign_key="model.model_id")

class Chipset(SQLModel, table=True):
    chipset_id:Optional[int] = Field(default=None, primary_key=True)
    name: str
    manufacturer: str
    version: str

class Model(SQLModel, table=True):
    model_id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    github_link: str
    hugging_face_link: str
    research_paper_link: str
    qai_hub_link: str
    model_end_point: str
    input_resolution: str
    parameters: str
    model_size: str


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
    device_id: Optional[int] = Field(default=None, foreign_key="device.device_id")
    model_id: Optional[int] = Field(default=None, foreign_key="model.model_id")
    library_id: Optional[int] = Field(default=None, foreign_key="library.library_id")

class Library(SQLModel, table=True):
    library_id: Optional[int] = Field(default=None, primary_key=True)
    library_name: str

#hero_1 = Hero(name="Deadpond", secret_name="Dive Wilson")
#hero_2 = Hero(name="Spider-Boy", secret_name="Pedro Parqueador")
#hero_3 = Hero(name="Rusty-Man", secret_name="Tommy Sharp", age=48)

#Make all of the mobiles devices offered
#google pixel 3
#google pixel 3a
#google pixel 3a XL
#google pixel 4
#google pixel 4a
#google pixel 5a 5G
#Samsung Galaxy S21
#Samsung Galaxy S21 Ultra
#Samsung Galaxy S21+
#Samsung Galaxy S22 5G
#Samsung Galaxy S22 Ultra 5G
#Samsung Galaxy S22+ 5G
#Samsung Galaxy S23
#Samsung Galaxy S23 Ultra
#Samsung Galaxy S23+
#Samsung Galaxy S24
#Samsung Galaxy S24 Ultra
#Samsung Galaxy S24+
#Samsung Galaxy Tab S8
#Snapdragon 8 Elite QRD
#Xiaomi 12
#Xiaomi 12 Pro
# Define a list of chipset data
chipsets_data = [
    ("Qualcomm Snapdragon 845", "Qualcomm", "845"),
    ("Qualcomm Snapdragon 670", "Qualcomm", "670"),
    ("Qualcomm Snapdragon 855", "Qualcomm", "855"),
    ("Qualcomm Snapdragon 730G", "Qualcomm", "730G"),
    ("Qualcomm Snapdragon 765G", "Qualcomm", "765G"),
    ("Qualcomm Snapdragon 888", "Qualcomm", "888"),
    ("Qualcomm Snapdragon 8 Gen 1", "Qualcomm", "8 Gen 1"),
    ("Qualcomm Snapdragon 8 Gen 2", "Qualcomm", "8 Gen 2"),
    ("Qualcomm Snapdragon 8 Gen 3", "Qualcomm", "8 Gen 3"),
    ("Qualcomm 8 Elite", "Qualcomm", "8 Elite")
]
#Device - (device_name, device_industry, device_company, version, addition, chipset_id)
devices_data = [
    ("google pixel 3", "mobile", "Google", 1),  #Snapdragon 845
    ("google pixel 3a", "mobile", "Google", 2),  #Snapdragon 670
    ("google pixel 3a XL", "mobile", "Google", 2), 
    ("google pixel 4", "mobile", "Google", 3),  # Snapdragon 855
    ("google pixel 4a", "mobile", "Google", 4),  # Snapdragon 730G
    ("google pixel 5a 5G", "mobile", "Google", 5),  # Snapdragon 765G
    ("Samsung Galaxy S21", "mobile", "Samsung", 6),  # Snapdragon 888
    ("Samsung Galaxy S21 Ultra", "mobile", "Samsung", 6),
    ("Samsung Galaxy S21+", "mobile", "Samsung", 6),
    ("Samsung Galaxy S22 5G", "mobile", "Samsung", 7),  # Snapdragon 8 Gen 1
    ("Samsung Galaxy S22 Ultra 5G", "mobile", "Samsung", 7),
    ("Samsung Galaxy S22+ 5G", "mobile", "Samsung", 7),
    ("Samsung Galaxy S23", "mobile", "Samsung", 8),  # Snapdragon 8 Gen 2
    ("Samsung Galaxy S23 Ultra", "mobile", "Samsung", 8),
    ("Samsung Galaxy S23+", "mobile", "Samsung", 8),
    ("Samsung Galaxy S24", "mobile", "Samsung", 9),  # Snapdragon 8 Gen 3
    ("Samsung Galaxy S24 Ultra", "mobile", "Samsung", 9),
    ("Samsung Galaxy S24+", "mobile", "Samsung", 9),
    ("Samsung Galaxy Tab S8", "tablet", "Samsung", 6),
    ("Snapdragon 8 Elite QRD", "mobile", "Qualcomm", 10),  # Custom chipset
    ("Xiaomi 12", "mobile", "Xiaomi", 7),
    ("Xiaomi 12 Pro", "mobile", "Xiaomi", 7)
]



engine = create_engine("sqlite:///database.db")


SQLModel.metadata.create_all(engine)

with Session(engine) as session:
    #Add all of the chipsets to the database
    for chipset_name, chipset_manufacturer, chipset_version in chipsets_data:
        chipset = Chipset(name=chipset_name, manufacturer=chipset_manufacturer, version=chipset_version)
        session.add(chipset)

    #Add all of the devices to the database
    for device_name, device_industry, device_company, chipset_id in devices_data:
        device = Device(device_name= device_name, device_industry= device_industry, device_company= device_company, chipset_id= chipset_id)
        session.add(device)
    session.commit()