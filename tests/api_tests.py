from fastapi.testclient import TestClient
from api.api import app

# See https://fastapi.tiangolo.com/tutorial/testing/

client = TestClient(app)

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