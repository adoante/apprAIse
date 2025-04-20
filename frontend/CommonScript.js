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
				`<li><a class="footerMenuItem" href="Dashboard.html">Dashboard</a></li>`
			)
		}
	}
});


const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', (e) => {
	e.stopPropagation(); // Prevent the click from bubbling to the document
	sidebar.classList.toggle('active');
	menuToggle.classList.toggle('active');
});

document.addEventListener('click', (e) => {
	const isClickInsideSidebar = sidebar.contains(e.target);
	const isClickOnToggle = menuToggle.contains(e.target);

	if (!isClickInsideSidebar && !isClickOnToggle) {
		sidebar.classList.remove('active');
		menuToggle.classList.remove('active');
	}
});