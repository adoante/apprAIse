from fastapi.testclient import TestClient
from fastapi import HTTPException
import pytest
from api.run_api import app
import database.sql_helper as database
from unittest.mock import MagicMock


# Initialize TestClient with the FastAPI app
client = TestClient(app)

#
# BENCHMARK TESTS
#

# Mock data
mock_benchmarks = [
    database.Benchmark(
        benchmark_id=1,
        device_id=1,
        library_id=1,
        accuracy_top1=0.85,
        accuracy_top5=0.95,
        inference_time=100,
        memory_usage=500,
        npu_layers=10
    ),
    database.Benchmark(
        benchmark_id=2,
        device_id=2,
        library_id=2,
        accuracy_top1=0.80,
        accuracy_top5=0.90,
        inference_time=120,
        memory_usage=550,
        npu_layers=12
    ),
]

mock_devices = [
    database.Device(device_id=1, device_name="Device A", industry="Industry 1", company="Company X", chipset_id=1),
    database.Device(device_id=2, device_name="Device B", industry="Industry 2", company="Company Y", chipset_id=2)
]

mock_libraries = [
    database.Library(library_id=1, library_name="Library X"),
    database.Library(library_id=2, library_name="Library Y")
]

# Mock the database functions
@pytest.fixture(autouse=True)
def mock_database(mocker):
    mocker.patch.object(database, 'get_all_benchmarks', return_value=mock_benchmarks)
    mocker.patch.object(database, 'get_device', side_effect=lambda device_id: next(d for d in mock_devices if d.device_id == device_id))
    mocker.patch.object(database, 'get_library', side_effect=lambda library_id: next(l for l in mock_libraries if l.library_id == library_id))
    mocker.patch.object(database, 'get_benchmark', side_effect=lambda benchmark_id: next((b for b in mock_benchmarks if b.benchmark_id == benchmark_id), None))


# Test the 'read_all_benchmark' endpoint

def test_read_all_benchmark():
    response = client.get("/api/v1/benchmark/")
    assert response.status_code == 200
    assert "benchmarks" in response.json()
    assert len(response.json()["benchmarks"]) == 2

def test_read_benchmark_by_device():
    response = client.get("/api/v1/benchmark/?device=Device A")
    assert response.status_code == 200
    assert len(response.json()["benchmarks"]) == 1
    assert response.json()["benchmarks"][0]["device_id"] == 1

def test_read_benchmark_by_library():
    response = client.get("/api/v1/benchmark/?library=Library X")
    assert response.status_code == 200
    assert len(response.json()["benchmarks"]) == 1
    assert response.json()["benchmarks"][0]["library_id"] == 1

def test_read_benchmark_sorted_by_accuracy_top1():
    response = client.get("/api/v1/benchmark/?sort=accuracy_top1&order=asc")
    assert response.status_code == 200
    benchmark = response.json()["benchmarks"]
    assert benchmark[0]["accuracy_top1"] < benchmark[1]["accuracy_top1"]

def test_read_benchmark_no_results():
    # Test when no benchmarks match the filters
    response = client.get("/api/v1/benchmark/?device=Nonexistent Device")
    assert response.status_code == 200
    assert response.json() == {"benchmarks": []}

# Test the 'read_benchmark' endpoint

def test_read_benchmark_by_id():
    response = client.get("/api/v1/benchmark/1")
    assert response.status_code == 200
    assert response.json()["benchmark_id"] == 1

def test_read_benchmark_not_found():
    response = client.get("/api/v1/benchmark/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Benchmark not found."}
