import api from "./js/modules/api_wrapper.js";

document.addEventListener("DOMContentLoaded", function () {
	const signupForm = document.getElementById("signup")

	signupForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const firstname = signupForm.elements['firstname'].value
		const lastname = signupForm.elements['lastname'].value
		const username = signupForm.elements['username'].value
		const email = signupForm.elements['email'].value
		const password = signupForm.elements['password'].value

		document.querySelectorAll("div.loginSignupAlert").forEach(alert => {
			alert.remove()
		})

		api.signup(username, password, firstname, lastname, email)
			.then(signupData => {
				document.querySelector(".loginSignupContainer").insertAdjacentHTML(
					"beforeend",
					`<div class="loginSignupAlert">${signupData.message}<div>`,
				);

				if (signupData.name != "Error") {
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
								window.location.href = "index.html"; // Change to your target URL
							  }
							}, 1000);
						})
				}
			})
	})
});