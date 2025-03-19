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

const baseURL = "http://127.0.0.1:8000/api/v1"

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
			let endpoint_name = endpoint.slice(1).charAt(0).toUpperCase() + endpoint.slice(2)
            throw new Error(`${endpoint_name} ${response.statusText} (${response.status})`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint.slice(1)}:`, error);
        throw error;
    }
}

async function filter_benchmarks(endpoint, device = "", library = "", sort = "", order = "") {
    try {
        let url = `${baseURL}${endpoint}/`;
        let params = new URLSearchParams();

        if (device) params.append("device", device);
        if (library) params.append("library", library);
        if (sort) params.append("sort", sort);
        if (order) params.append("order", order);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        let response = await fetch(url);
        
        if (!response.ok) {
            let endpoint_name = endpoint.charAt(1).toUpperCase() + endpoint.slice(2);
            throw new Error(`${endpoint_name} ${response.statusText} (${response.status})`);
        }

        return await response.json(); // Returning fetched data

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
    filter_benchmarks: (device, library, sort, order) => filter_benchmarks("/benchmark", device, library, sort, order)
};

export default api