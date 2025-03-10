// get_root()
function get_root() {
	const outputElement = document.getElementById("test-data");

	fetch('http://127.0.0.1:8000/')
		.then(response => {
			if (!response.ok) {
				throw new Error('API request failed')
			}

			return response.json()
		})
		.then(data => {
			outputElement.innerHTML = JSON.stringify(data)
		})
		.catch(error => {
			console.error('Error:', error)
		});
}

// read_user(user_id: str)
document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");

    if (userForm) {
        userForm.addEventListener("submit", read_user);
    }
});

function read_user(event) {
    event.preventDefault();
    const userForm = event.target;
    const userFormData = new FormData(userForm);

    userID = Array.from(userFormData.entries())[0][1];

	const outputElement = document.getElementById("test-read-user");

	fetch(`http://127.0.0.1:8000/user/${userID}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('API request failed.')
			}

			return response.json()
		})
		.then(data => {
			outputElement.innerHTML = JSON.stringify(data)
		})
		.catch(error => {
			console.error(error)
			outputElement.innerHTML = `'${userID}' not found.`
		});
}