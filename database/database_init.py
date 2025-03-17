import pandas as pd
from typing import Optional
from sqlmodel import Field, Session, SQLModel, create_engine

# Database Models
class User(SQLModel, table=True):
    user_id: Optional[int] = Field(default=None, primary_key=True)
    user_name: str
    first_name: str
    last_name: str
    email: str
    password_hash: str
    qai_hub_api_token: str
    customization_id: Optional[int] = Field(default=None, foreign_key="customization.customization_id")

class Customization(SQLModel, table=True):
    customization_id: Optional[int] = Field(default=None, primary_key=True)
    favorite_id: Optional[int] = Field(default=None, foreign_key="favorite.favorites_id")

class Favorite(SQLModel, table=True):
    favorites_id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    model_id: Optional[int] = Field(default=None, foreign_key="model.model_id")

class Chipset(SQLModel, table=True):
    chipset_id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    manufacturer: str
    version: str

class Model(SQLModel, table=True):
    model_id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    github_link: str
    hugging_face_link: str
    research_paper_link: str
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
    benchmark_est_inf_time: int
    benchmark_est_peak_mem: int
    benchmark_first_load_time: int
    benchmark_first_load_mem: int
    benchmark_warm_load_time: int
    benchmark_warm_load_mem: int
    model_id: Optional[int] = Field(default=None, foreign_key="model.model_id")

# Chipset Data
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

# Device Data
devices_data = [
    ("google pixel 3", "mobile", "Google", 1),
    ("google pixel 3a", "mobile", "Google", 2),
    ("google pixel 3a XL", "mobile", "Google", 2),
    ("google pixel 4", "mobile", "Google", 3),
    ("google pixel 4a", "mobile", "Google", 4),
    ("google pixel 5a 5G", "mobile", "Google", 5),
    ("Samsung Galaxy S21", "mobile", "Samsung", 6),
    ("Samsung Galaxy S21 Ultra", "mobile", "Samsung", 6),
    ("Samsung Galaxy S21+", "mobile", "Samsung", 6),
    ("Samsung Galaxy S22 5G", "mobile", "Samsung", 7),
    ("Samsung Galaxy S22 Ultra 5G", "mobile", "Samsung", 7),
    ("Samsung Galaxy S22+ 5G", "mobile", "Samsung", 7),
    ("Samsung Galaxy S23", "mobile", "Samsung", 8),
    ("Samsung Galaxy S23 Ultra", "mobile", "Samsung", 8),
    ("Samsung Galaxy S23+", "mobile", "Samsung", 8),
    ("Samsung Galaxy S24", "mobile", "Samsung", 9),
    ("Samsung Galaxy S24 Ultra", "mobile", "Samsung", 9),
    ("Samsung Galaxy S24+", "mobile", "Samsung", 9),
    ("Samsung Galaxy Tab S8", "tablet", "Samsung", 6),
    ("Snapdragon 8 Elite QRD", "mobile", "Qualcomm", 10),
    ("Xiaomi 12", "mobile", "Xiaomi", 7),
    ("Xiaomi 12 Pro", "mobile", "Xiaomi", 7)
]

# Initialize Database
engine = create_engine("sqlite:///database.db")
SQLModel.metadata.create_all(engine)

# Insert Data
with Session(engine) as session:
    try:
        # Insert Chipsets
        chipset_objects = [Chipset(name=name, manufacturer=manufacturer, version=version) for name, manufacturer, version in chipsets_data]
        session.bulk_save_objects(chipset_objects)

        # Insert Devices
        device_objects = [Device(device_name=name, device_industry=industry, device_company=company, chipset_id=chipset_id) for name, industry, company, chipset_id in devices_data]
        session.bulk_save_objects(device_objects)

        # Commit all changes
        session.commit()
        print("Database successfully populated.")

    except Exception as e:
        session.rollback()
        print(f"Error occurred: {e}")
