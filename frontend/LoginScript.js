import { loginUser } from "./js/modules/AuthScript.js";

document.addEventListener("DOMContentLoaded", function () {

	const loginForm = document.getElementById("login")

	loginForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const username = loginForm.elements['username'].value
		const password = loginForm.elements['password'].value

		loginUser(username, password)
	});	
});

export default loginUser