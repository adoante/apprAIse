import api from "./js/modules/api_wrapper.js";

document.addEventListener("DOMContentLoaded", function () {

	const loginForm = document.getElementById("login")

	loginForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const username = loginForm.elements['username'].value
		const password = loginForm.elements['password'].value

		api.login(username, password)
			.then(logindata => {
				localStorage.setItem("access_token", logindata["token"].access_token);

				document.querySelector(".loginSignupContainer").insertAdjacentHTML(
					"beforeend",
					`<div class="loginSignupAlert">${logindata["message"]}<div>`,
				);

				document.querySelector(".loginSignupContainer").insertAdjacentHTML(
					"beforeend",
					`<div class="loginSignupAlert">Redirecting in <span id="redirectCountdown">5</span> seconds...<div>`,
				);

				let seconds = 5;
				const countdownEl = document.getElementById('redirectCountdown');

				const interval = setInterval(() => {
					seconds--;
					countdownEl.textContent = seconds;

					if (seconds === 0) {
						clearInterval(interval);
						window.location.href = "Dashboard.html"; // Change to your target URL
					}
				}, 1000);
			})
			.catch(error => {
				document.querySelector(".loginSignupContainer").insertAdjacentHTML(
					"beforeend",
					`<div class="loginSignupAlert">Check Username or password.<div>`,
				);
			})
	});
});