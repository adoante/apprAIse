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
def read_user(user_id: int):
    user = database.get_user(user_id)

    if user == None:
        raise HTTPException(status_code = 404, detail = "User not found.")
    
    response = JSONResponse(
        status_code = 200,
        content = {
            "user_id": user.user_id,
            "user_name": user.user_name,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "password_hash": user.password_hash,
            "qai_hub_api_token": user.qai_hub_api_token,
            "customization_id": user.customization_id
        }
    )

    return response

@app.get("/customization/{customization_id}")
def read_customization(customization_id: int):
    customization = database.get_customization(customization_id)

    if customization == None:
        raise HTTPException(status_code = 404, detail = "Customization not found.")
    
    response = JSONResponse(
        status_code = 200,
        content = {
            "customization_id": customization.customization_id,
            "favorite_id": customization.favorite_id
        }
    )
    
    return response

@app.get("/favorite/{favorites_id}")
def read_favorite(favorites_id: int):
    favorite = database.get_favorite(favorites_id)
    
    if favorite == None:
        raise HTTPException(status_code = 404, detail = "Favorite not found.")
    
    response = JSONResponse(
        status_code = 200,
        content = {
            "favorites_id": favorite.favorites_id,
            "user_id": favorite.user_id,
            "model_id": favorite.model_id
        }
    )
    
    return response