/*
FetchAPI:
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

Why they use Async/Await:
https://javascript.info/async-await

Using FetchAPI
https://dmitripavlutin.com/javascript-fetch-async-await/

Promise Docs:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
*/

const baseURL = "http://127.0.0.1:8000/"

// get api root
async function get_root() {
	const response = await fetch(baseURL);

	if (!response.ok) {
		const message = `Response status: ${response.status}`
		throw new Error(message);
	}

	const json = await response.json();
	return json
}

async function read_user(user_id) {
	const response = await fetch(`${baseURL}user/${user_id}`);

	if (!response.ok) {
		throw new Error(`User ${response.statusText}: ${response.status}`);
	}

	const json = await response.json();
	return json
}

export { get_root, read_user};