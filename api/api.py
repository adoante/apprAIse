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

@app.get("/hero/{name}")
def read_hero(name: str):
    hero = database.get_hero(name)
    
    if hero == None:
        raise HTTPException(status_code=404, detail="Hero not found.")
    
    response = JSONResponse(
        status_code=200, content={
				"id": hero.id,
				"name": hero.name,
				"secret_name": hero.secret_name,
				"name": hero.name
			})

    return response