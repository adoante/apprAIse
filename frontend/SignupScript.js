import { signupUser } from "./js/modules/AuthScript.js";

document.addEventListener("DOMContentLoaded", function () {
	const signupForm = document.getElementById("signup")

	signupForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const firstname = signupForm.elements['firstname'].value
		const lastname = signupForm.elements['lastname'].value
		const username = signupForm.elements['username'].value
		const email = signupForm.elements['email'].value
		const password = signupForm.elements['password'].value

		signupUser(username, password, firstname, lastname, email)
	})
});