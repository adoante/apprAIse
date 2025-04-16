from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from api.v1.api import router as api_router
from database.database_init import create_db
from database.sql_helper import remove_duplicates

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db()
    remove_duplicates()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the ApprAIse API!"}

app.include_router(api_router, prefix = "/api/v1")