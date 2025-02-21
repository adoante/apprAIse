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

// read_hero(name: str)
document.addEventListener("DOMContentLoaded", () => {
    const heroForm = document.getElementById("heroForm");

    if (heroForm) {
        heroForm.addEventListener("submit", read_hero);
    }
});

function read_hero(event) {
    event.preventDefault();
    const heroForm = event.target;
    const heroFormData = new FormData(heroForm);

    heroName = Array.from(heroFormData.entries())[0][1];

	const outputElement = document.getElementById("test-read-hero");

	fetch(`http://127.0.0.1:8000/hero/${heroName}`)
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

/**
 * {
				"id": hero.id,
				"name": hero.name,
				"secret_name": hero.secret_name,
				"name": hero.name
			}
 */