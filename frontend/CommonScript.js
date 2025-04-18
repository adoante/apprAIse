/*
	CommonScript.js handles html elements that are exactly the same
	across multiple pages and updates/modifies those elements accordingly.
*/

import api from "./js/modules/api_wrapper.js"

document.addEventListener("DOMContentLoaded", function () {
	const loginLink = document.querySelector(".navMenu.edge")
	const loginLinkFooter = document.querySelector(".footerMenu")

	const access_token = localStorage.getItem("access_token")
	if (access_token) {

		loginLink.href = "Dashboard.html"
		loginLink.textContent = "Dashboard"

		if (loginLinkFooter.lastElementChild) {
			loginLinkFooter.removeChild(loginLinkFooter.lastElementChild)
			
			loginLinkFooter.insertAdjacentHTML(
				"beforeend",
				`<li><a class="footerMenuItem" href="uploadImage.html">Inference</a></li>`
			)

			loginLinkFooter.insertAdjacentHTML(
				"beforeend",
				`<li><a class="footerMenuItem" href="Dashboard.html">Dashboard</a></li>`
			)
		}

		loginLink.insertAdjacentHTML(
			"beforebegin",
			`<li><a class="navMenu" href="uploadImage.html">Inference</a></li>`
		)
	}
});