import api from "./js/modules/api_wrapper.js";

document.addEventListener("DOMContentLoaded", function () {
	handleNavForLoggedIn();
	handleNavForLoggedOut();
});

function handleNavForLoggedOut() {
	const loginLink = document.querySelector(".navMenu.edge");
	const loginLinkFooter = document.querySelector(".footerMenu");

	const access_token = localStorage.getItem("access_token");
	if (!access_token) {

		// Set Login in header
		if (loginLink) {
			loginLink.href = "Login.html";
			loginLink.textContent = "Login";
		}

		// Remove Inference link from nav
		const inferenceNav = document.querySelector('a.navMenu[href="inference.html"]');
		if (inferenceNav && inferenceNav.parentElement) {
			inferenceNav.parentElement.remove();
		}

		// Remove inference & dashboard from footer
		if (loginLinkFooter) {
			const inferenceFooter = loginLinkFooter.querySelector('a[href="inference.html"]');
			const dashboardFooter = loginLinkFooter.querySelector('a[href="Dashboard.html"]');

			if (inferenceFooter?.parentElement) inferenceFooter.parentElement.remove();
			if (dashboardFooter?.parentElement) dashboardFooter.parentElement.remove();

			// Restore just Login if needed
			if (!loginLinkFooter.querySelector('a[href="Login.html"]')) {
				loginLinkFooter.insertAdjacentHTML(
					"beforeend",
					`<li><a class="footerMenuItem" href="Login.html">Login</a></li>`
				);
			}
		}
	}
};

function handleNavForLoggedIn() {
	const loginLink = document.querySelector(".navMenu.edge");
	const loginLinkFooter = document.querySelector(".footerMenu");

	const access_token = localStorage.getItem("access_token");
	if (access_token) {
		// Set Dashboard in header
		loginLink.href = "Dashboard.html";
		loginLink.textContent = "Dashboard";

		// Add nav Inference if not present
		if (!document.querySelector('.navMenu[href="inference.html"]')) {
			loginLink.insertAdjacentHTML(
				"beforebegin",
				`<li><a class="navMenu" href="inference.html">Inference</a></li>`
			);
		}

		// Add to footer
		if (loginLinkFooter) {
			if (!loginLinkFooter.querySelector('a[href="inference.html"]')) {
				loginLinkFooter.insertAdjacentHTML(
					"beforeend",
					`<li><a class="footerMenuItem" href="inference.html">Inference</a></li>`
				);
			}
			if (!loginLinkFooter.querySelector('a[href="Dashboard.html"]')) {
				loginLinkFooter.insertAdjacentHTML(
					"beforeend",
					`<li><a class="footerMenuItem" href="Dashboard.html">Dashboard</a></li>`
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
