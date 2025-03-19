import database.sql_helper as database

from fastapi import APIRouter, HTTPException
from enum import Enum
from typing import List, Optional

router = APIRouter()

class SortMetric(str, Enum):
    accuracy_top1 = "accuracy_top1"
    accuracy_top5 = "accuracy_top5"
    inference_time = "inference_time"
    memory_usage = "memory_usage"
    npu_layers = "npu_layers"

class SortOrder(str, Enum):
    asc = "asc"
    desc = "desc"

@router.get("/")
def read_all_benchmarks(
        device: Optional[str] = None,
        library: Optional[str] = None,
        sort: Optional[SortMetric] = None,
        order: SortOrder = SortOrder.asc,
    ) -> dict[str, List[database.Benchmark]]:
    
    benchmarks = database.get_all_benchmarks()
    
    if not benchmarks:
        raise HTTPException(status_code = 404, detail = "Benchmarks not found.")

    # Filter by device
    if device:
        device = device.lower()
        benchmarks = [
            benchmark for benchmark in benchmarks 
            if database.get_device(benchmark.device_id).device_name.lower() == device
        ]

    # Filter by library
    if library:
        library = library.lower()
        benchmarks = [
            benchmark for benchmark in benchmarks 
            if database.get_library(benchmark.library_id).library_name.lower() == library
        ]

    # Sort by metric
    if sort:
        reverse_order = order == SortOrder.desc
        benchmarks = sorted(
            benchmarks, key=lambda x: getattr(x, sort.value, 0), reverse=reverse_order
        )
    
    return {"benchmarks": benchmarks}

@router.get("/{benchmark_id}")
def read_benchmark(benchmark_id: int) -> database.Benchmark:
    benchmark = database.get_benchmark(benchmark_id)

    if benchmark == None:
        raise HTTPException(status_code = 404, detail = "Benchmark not found.")
    
    return benchmark