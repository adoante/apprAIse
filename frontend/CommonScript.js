/*
	CommonScript.js handles html elements that are exactly the same
	across multiple pages and updates/modifies those elements accordingly.
*/

import api from "./js/modules/api_wrapper.js"

document.addEventListener("DOMContentLoaded", function () {
	const loginLink = document.querySelector(".navMenu.edge")
	const access_token = localStorage.getItem("access_token")
	if (access_token) {
		loginLink.href = "Dashboard.html"
		loginLink.textContent = "Dashboard"
	}
});