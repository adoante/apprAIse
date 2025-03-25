import api from './js/modules/api_wrapper.js';

document.addEventListener("DOMContentLoaded", function () {
	/* Matthew's dropdown stuff*/
	document.querySelectorAll(".dropdown-btn").forEach(button => {
		button.addEventListener("click", function (event) {
			event.stopPropagation(); // Prevents event from bubbling to document

			let content = this.nextElementSibling;
			let isOpen = content.style.maxHeight;
			let arrow = this.querySelector(".arrow"); // Get the arrow inside the button

			// Close all dropdowns and reset arrows
			document.querySelectorAll(".dropdown-content").forEach(drop => {
				drop.style.maxHeight = null;
				let otherArrow = drop.previousElementSibling.querySelector(".arrow");
				if (otherArrow) {
					otherArrow.classList.remove("rotated"); // Avoid null error
				}
			});

			// Toggle only the clicked one
			if (!isOpen) {
				content.style.maxHeight = content.scrollHeight + "px";
				if (arrow) {
					arrow.classList.add("rotated"); // Add class only if arrow exists
				}
			}
		});
	});

	// Close dropdowns if clicking outside
	document.addEventListener("click", function () {
		document.querySelectorAll(".dropdown-content").forEach(drop => {
			drop.style.maxHeight = null;
			let arrow = drop.previousElementSibling.querySelector(".arrow");
			if (arrow) {
				arrow.classList.remove("rotated");
			}
		});
	});

	/* Populate models, devices, libraries dropdowns dynamically*/
	api.filter_models().then(data => {
		data["models"].forEach(model => {
			document.querySelectorAll(".dropdown-content-model").forEach(modelDropdown => {
				modelDropdown.insertAdjacentHTML(
					"afterbegin",
					`<p class="dropdownItem">${model["model_name"]}</p>`,
				);
			})
		})
	})

	api.filter_devices().then(data => {
		data["devices"].forEach(device => {
			document.querySelectorAll(".dropdown-content-device").forEach(deviceDropdown => {
				deviceDropdown.insertAdjacentHTML(
					"afterbegin",
					`<p class="dropdownItem">${device["device_name"]}</p>`,
				);
			})
		})
	})

	api.filter_libraries().then(data => {
		data["libraries"].forEach(library => {
			document.querySelectorAll(".dropdown-content-library").forEach(libraryDropdown => {
				libraryDropdown.insertAdjacentHTML(
					"afterbegin",
					`<p class="dropdownItem">${library["library_name"]}</p>`,
				);
			})
		})
	})

	/* On click update respective model column data*/
    document.querySelectorAll(".dropdown-content-model").forEach(button => {
		button.addEventListener("click", function (event) {
			if (event.target.classList.contains("dropdownItem")) {
				console.log(event.target.textContent + " clicked!");
			}
		})
	})

	document.querySelectorAll(".dropdown-content-device").forEach(button => {
		button.addEventListener("click", function (event) {
			if (event.target.classList.contains("dropdownItem")) {
				console.log(event.target.textContent + " clicked!");
			}
		})
	})

	document.querySelectorAll(".dropdown-content-library").forEach(button => {
		button.addEventListener("click", function (event) {
			if (event.target.classList.contains("dropdownItem")) {
				console.log(event.target.textContent + " clicked!");
			}
		})
	})
});