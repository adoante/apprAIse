// get_root()
export function get_root() {
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

export function read_user(user_id) {
	fetch(`http://127.0.0.1:8000/user/${user_id}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('API request failed.')
			}

			return response.json()
		})
		.then(data => {
			return JSON.stringify(data)
		})
		.catch(error => {
			console.error(error)
			return`'${userID}' not found.`
		});
}