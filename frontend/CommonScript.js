import api from "./js/modules/api_wrapper.js";

document.addEventListener("DOMContentLoaded", function () {
	handleNavigation();
});

function handleNavigation() {
	const loginLink = document.querySelector(".navMenu.edge");
	const loginLinkFooter = document.querySelector(".footerMenu");
	const access_token = localStorage.getItem("access_token");

	if (access_token) {
		// Header: Show Dashboard
		if (loginLink) {
			loginLink.href = "Dashboard.html";
			loginLink.textContent = "Dashboard";
		}

		// Footer: Ensure Dashboard link is present
		if (loginLinkFooter) {
			if (!loginLinkFooter.querySelector('a[href="Dashboard.html"]')) {
				loginLinkFooter.insertAdjacentHTML(
					"beforeend",
					`<li><a class="footerMenuItem" href="Dashboard.html">Dashboard</a></li>`
				);
			}

			// Remove Login link if it exists
			const loginFooter = loginLinkFooter.querySelector('a[href="Login.html"]');
			if (loginFooter?.parentElement) loginFooter.parentElement.remove();
		}
	} else {
		// Header: Show Login
		if (loginLink) {
			loginLink.href = "Login.html";
			loginLink.textContent = "Login";
		}

		// Footer: Remove Dashboard
		if (loginLinkFooter) {
			const dashboardFooter = loginLinkFooter.querySelector('a[href="Dashboard.html"]');
			if (dashboardFooter?.parentElement) dashboardFooter.parentElement.remove();

			// Ensure Login is present
			if (!loginLinkFooter.querySelector('a[href="Login.html"]')) {
				loginLinkFooter.insertAdjacentHTML(
					"beforeend",
					`<li><a class="footerMenuItem" href="Login.html">Login</a></li>`
				);
			}
		}
	}
}


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
