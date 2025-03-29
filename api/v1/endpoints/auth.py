import database.sql_helper as database

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext

from datetime import datetime, timedelta, timezone
from typing import Annotated

# to get a string like this run:
# openssl rand -hex 32
# CHANGE THIS FOR DEPLOYMENT

SECRET_KEY = "06ed8db8b1f1b75b8f2ceb2b650f8b3b356aba9963f55c120361b6a9aeb2a0c2"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    username: str | None = None
    
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user_by_name