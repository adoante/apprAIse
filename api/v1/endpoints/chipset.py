import database.sql_helper as database

from fastapi import APIRouter, HTTPException
from typing import List, Optional

router = APIRouter()

@router.get("/")
def read_all_chipset(
		name: Optional[str] = None
	) -> dict[str, List[database.Chipset]]:
	
	chipsets = database.get_all_chipsets()
	
	if not chipsets:
		raise HTTPException(status_code = 404, detail = "Chipsets not found")

	# Filter by chipset_name
	if name:
		name = name.lower()
		chipsets = [
			chipset for chipset in chipsets
			if chipset.chipset_name.lower().find(name) > -1
		]

	return {"chipsets": chipsets}

# get specific chipset by chipset id
@router.get("/{chipset_id}")
def read_chipset(chipset_id: int) -> database.Chipset:
	chipset = database.get_chipset(chipset_id)
	
	if chipset == None:
		raise HTTPException(status_code = 404, detail = "Chipset not found.")
	
	return chipset