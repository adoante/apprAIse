import database.sql_helper as database

from fastapi import APIRouter, HTTPException
from enum import Enum
from typing import List, Optional

router = APIRouter()

class SortMetric(str, Enum):
    model_size = "model_size"
    parameters = "parameters"

class SortOrder(str, Enum):
    asc = "asc"
    desc = "desc"

@router.get("/")
def read_all_model(
        name: Optional[str] = None,
        end_point: Optional[str] = None,
        input_resolution: Optional[str] = None,
        sort: Optional[SortMetric] = None,
        order: SortOrder = SortOrder.asc
    ) -> dict[str, List[database.Model]]:

    models = database.get_all_models()

    if not models:
        raise HTTPException(status_code = 404, detail = "Models not found.")

    # Filter by model_name
    if name:
        name = name.lower()
        models = [
            model for model in models
            if model.model_name.lower().find(name) > -1
        ]

    # Filter by end point
    if end_point:
        end_point = end_point.lower()
        models = [
            model for model in models
            if model.model_end_point.lower().find(end_point) > -1
        ]

    # Filter by input resolution
    if input_resolution:
        input_resolution = input_resolution.lower()
        models = [
            model for model in models
            if model.input_resolution.lower().find(input_resolution) > -1
        ]

    # Sort by metric
    if sort:
        reverse_order = order == SortOrder.desc
        models = sorted(
            models, key=lambda x: getattr(x, sort.value, 0), reverse=reverse_order
        )

    return {"models": models}

# get specific model by chipset id
@router.get("/{model_id}")
def read_model(model_id: int) -> database.Model:
    model = database.get_model(model_id)
    
    if model == None:
        raise HTTPException(status_code = 404, detail = "Model not found.")
    
    return model