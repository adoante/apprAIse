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
				throw new Error('API request failed.')
			}

			return response.json()
		})
		.then(data => {
			outputElement.innerHTML = JSON.stringify(data)
		})
		.catch(error => {
			console.error(error)
			outputElement.innerHTML = `'${heroName}' not found.`
		});
}


document.addEventListener("DOMContentLoaded", function () {
	const dropdownBtn = document.querySelector(".dropdown-btn");
	const dropdownContent = document.querySelector(".dropdown-content");

	// Toggle dropdown on button click
	dropdownBtn.addEventListener("click", function (event) {
		event.stopPropagation(); // Prevent click from closing immediately
		dropdownContent.classList.toggle("show");
	});

	// Close dropdown when clicking outside
	window.addEventListener("click", function (event) {
		if (!dropdownBtn.contains(event.target)) {
			dropdownContent.classList.remove("show");
		}
	});
});