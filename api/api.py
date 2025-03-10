from fastapi import FastAPI
import database.sql_helper as database
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {'message': 'Hello World'}

# Example endpoint

# @app.get("/hero/{name}")
# def read_hero(name: str):
#     hero = database.get_hero(name)
    
#     if hero == None:
#         raise HTTPException(status_code=404, detail="Hero not found.")
    
#     response = JSONResponse(
#         status_code=200, content={
# 				"id": hero.id,
# 				"name": hero.name,
# 				"secret_name": hero.secret_name,
# 				"name": hero.name
# 			})

#     return response

# get specific user by id
@app.get("/user/{user_id}")
def read_user(user_id: int) -> database.User:
    user = database.get_user(user_id)

    if user == None:
        raise HTTPException(status_code = 404, detail = "User not found.")
    
    return user

# get specific customization by customization id
@app.get("/customization/{customization_id}")
def read_customization(customization_id: int) -> database.Customization:
    customization = database.get_customization(customization_id)

    if customization == None:
        raise HTTPException(status_code = 404, detail = "Customization not found.")
    
    return customization

# get specific favorites by favorites id
@app.get("/favorite/{favorites_id}")
def read_favorite(favorites_id: int) -> database.Favorite:
    favorite = database.get_favorite(favorites_id)
    
    if favorite == None:
        raise HTTPException(status_code = 404, detail = "Favorite not found.")
    
    return favorite

# get specific chipset by chipset id
@app.get("/chipset/{chipset_id}")
def read_chipset(chipset_id: int) -> database.Chipset:
    chipset = database.get_chipset(chipset_id)
    
    if chipset == None:
        raise HTTPException(status_code = 404, detail = "Chipset not found.")
    
    return chipset

# get specific model by chipset id
@app.get("/model/{model_id}")
def read_model(model_id: int) -> database.Model:
    model = database.get_model(model_id)
    
    if model == None:
        raise HTTPException(status_code = 404, detail = "Model not found.")
    
    return model

# get specific device by device id
@app.get("/device/{device_id}")
def read_device(device_id: int) -> database.Device:
    device = database.get_device(device_id)
    
    if device == None:
        raise HTTPException(status_code = 404, detail = "Device not found.")
    
    return device

@app.get("/benchmark/{benchmark_id}")
def read_benchmark(benchmark_id: int) -> database.Benchmark:
    benchmark = database.get_benchmark(benchmark_id)

    if benchmark == None:
        raise HTTPException(status_code = 404, detail = "Benchmark not found")
    
    return benchmark