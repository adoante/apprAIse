/*
FetchAPI:
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

Why they use Async/Await:
https://javascript.info/async-await

Using FetchAPI
https://dmitripavlutin.com/javascript-fetch-async-await/

Promise Docs:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

JS Modules:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules


*/

const baseURL = "http://127.0.0.1:8000"

async function fetchData(endpoint, id = "") {
    try {
		let url;
		if (id == 0) {
			url = `${baseURL}${endpoint}/${id}`
		}
		else if (id) {
			url = `${baseURL}${endpoint}/${id}`
		}
		else {
			url = `${baseURL}${endpoint}`
		}

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`${endpoint.slice(1)} not found: ${response.statusText} (${response.status})`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint.slice(1)}:`, error);
        throw error;
    }
}

// each endpoint function uses an arrow function.
// shorthand way of writing functions
const api = {
    read_root: () => fetchData(""),
    read_user: (user_id) => fetchData("/user", user_id),
    read_customization: (customization_id) => fetchData("/customization", customization_id),
    read_favorite: (favorites_id) => fetchData("/favorite", favorites_id),
    read_chipset: (chipset_id) => fetchData("/chipset", chipset_id),
    read_model: (model_id) => fetchData("/model", model_id),
    read_device: (device_id) => fetchData("/device", device_id),
    read_benchmark: (benchmark_id) => fetchData("/benchmark", benchmark_id),
};

export default api