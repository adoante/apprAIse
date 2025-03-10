from fastapi.testclient import TestClient
from api.api import app

# See https://fastapi.tiangolo.com/tutorial/testing/

client = TestClient(app)

# user endpoint tests

def test_read_user():
	response = client.get('/user/0')
	assert response.status_code == 200
	assert response.json() == {
		"user_id": 0,
	  	"user_name": "testUser",
	  	"first_name": "test",
	  	"last_name": "user",
	  	"email": "test@user.com",
	  	"password_hash": "hashed-password",
	  	"qai_hub_api_token": "qai-api-token",
	  	"customization_id": None
	}

def test_read_nonexistent_user():
	response = client.get("/user/-1")
	assert response.status_code == 404
	assert response.json() == {
		"detail": "User not found."
	}

# customization endpoint tests

def test_read_customization():
    response = client.get("/customization/0")
    assert response.json() == {
		"customization_id": 0, "favorite_id": None
	}

def test_read_customization_nonexistent():
    response = client.get("/customization/-1")
    assert response.json() == {
		"detail": "Customization not found."
	}


# favorites endpoint tests

def test_read_favorite():
	response = client.get("/favorite/0")
	assert response.json() == {
		"favorites_id": 0,
		"user_id": 0,
		"model_id": 0
	}

def test_read_favorite_nonexistent():
	response = client.get("/favorite/-1")  # Assuming this ID does not exist
	assert response.json() == {
		"detail": "Favorite not found."
	}

# chipset endpoint tests

def test_read_chipset():
	response = client.get("/chipset/0")
	assert response.json() == {
		"chipset_id": 0,
		"name": "chipset-name",
		"manufacturer": "man",
		"version": "1.0"
	}

def test_read_chipset_nonexistent():
	response = client.get("/chipset/-1")
	assert response.json() == {
		"detail": "Chipset not found."
	}

# model endpoint tests

def test_read_model():
	response = client.get("/model/0")
	assert response.json() == {
		"model_id": 0,
		"name": "name",
		"github_link": "link",
		"hugging_face_link": "link",
		"research_paper_link": "link",
		"model_end_point": "endpoint",
		"input_resolution": "ir",
		"parameters": "param",
		"model_size": "size"
	}

def test_read_model_nonexistent():
	response = client.get("/model/-1")
	assert response.json() == {
		"detail": "Model not found."
	}

# device endpoint tests

def test_read_device():
	response = client.get("/device/0")
	assert response.json() == {
		"device_id": 0,
		"device_name": "name",
		"device_industry": "industry",
		"device_company": "company",
		"chipset_id": 0
	}

def test_read_device_nonexistent():
	response = client.get("/device/-1")
	assert response.json() == {
		"detail": "Device not found."
	}

# benchmark endpoint tests

def test_read_benchmark():
	response = client.get("/benchmark/0")
	assert response.json() == {
		"benchmark_id": 0,
		"benchmark_est_inf_time": 0,
		"benchmark_est_peak_mem": 0,
		"benchmark_first_load_time": 0,
		"benchmark_first_load_mem": 0,
		"benchmark_warm_load_time": 0,
		"benchmark_warm_load_mem": 0,
		"model_id": 0
	}

def test_read_benchmark_nonexistent():
	response = client.get("/benchmark/-1")
	assert response.json() == {
		"detail": "Benchmark not found."
	}
