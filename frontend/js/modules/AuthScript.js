import api from "./api_wrapper.js"

async function signupUser(username, password, firstname, lastname, email) {
	const data = await api.signup(username, password, firstname, lastname, email);

	if (data && data.message === `User: ${username} created successfully.`) {
		console.log("Signup successful:", data);
		await loginUser(username, password);
	} else {
		console.error("Signup failed:", data);
	}
}

async function loginUser(username, password) {
	const data = await api.login(username, password);
	
	if (data && data.access_token) {
		localStorage.setItem("access_token", data.access_token); // Store token
		console.log("Login successful:", data);
		
	} else {
		console.error("Login failed!");
	}
}

export { signupUser, loginUser }