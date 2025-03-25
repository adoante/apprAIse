import database.sql_helper as database

from fastapi import APIRouter, HTTPException
from typing import List, Optional

router = APIRouter()

@router.get("/")
def read_all_library(
        name: Optional[str] = None 
    ) -> dict[str, List[database.Library]]:

    libraries = database.get_all_library()

    if not libraries:
        raise HTTPException(status_code = 404, detail = "Library not found.")

    # Filter by device_name
    if name:
        name = name.lower()
        libraries = [
            library for library in libraries
            if library.library_name.lower().find(name) > -1
        ]

    return {"devices": libraries}

# get specific device by device id
@router.get("/{library_id}")
def read_library(library_id: int) -> database.Library:
    library = database.get_library(library_id)
    
    if library == None:
        raise HTTPException(status_code = 404, detail = "Library not found.")
    
    return library