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

URL Search Params
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

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

async function filter_models(endpoint, name = "", end_point = "", input_resolution = "", sort = "", order = "") {
    try {
        let url = `${baseURL}${endpoint}/`
        let params = new URLSearchParams();

        if (name) params.append("name", name);
        if (end_point) params.append("end_point", end_point);
        if (input_resolution) params.append("input_resolution", input_resolution);
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

        return await response.json();

    } catch (error) {
        console.error(`Error fetching ${endpoint.slice(1)}:`, error)
    }
}

async function filter_devices(endpoint, name = "") {
    try {
        let url = `${baseURL}${endpoint}/`
        let params = new URLSearchParams();

        if (name) params.append("name", name);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        let response = await fetch(url);

        if (!response.ok) {
            let endpoint_name = endpoint.charAt(1).toUpperCase() + endpoint.slice(2);
            throw new Error(`${endpoint_name} ${response.statusText} (${response.status})`);
        }

        return await response.json();

    } catch (error) {
        console.error(`Error fetching ${endpoint.slice(1)}:`, error)
    }
}

async function signup(username, password, firstname, lastname, email) {
    try {
        const url = `${baseURL}/user/register`;

        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        if (!response.ok) {
            const errorMessage = await response.text();  // Read the response body in case of error
            throw new Error(`Signup failed: ${response.statusText} (${response.status}) - ${errorMessage}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error signing up:", error);
    }
}

async function login(username, password) {
    let url = `${baseURL}/auth/token`

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText} (${response.status})`);
        }

        const data = await response.json();

        localStorage.setItem("access_token", data.access_token);

        return data;

    } catch (error) {
        console.error("Error logging in:", error);
    }
}

async function get_current_user() {
    const token = localStorage.getItem("access_token");

    if (!token) {
        console.error("No token found. Please log in.");
        return;
    }

    try {
        let url = `${baseURL}/user/me`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.statusText} (${response.status})`);
        }

        const userData = await response.json();

        console.log("User Data:", userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

async function filter_libraries(endpoint, name = "") {
    try {
        let url = `${baseURL}${endpoint}/`
        let params = new URLSearchParams();

        if (name) params.append("name", name);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        let response = await fetch(url);

        if (!response.ok) {
            let endpoint_name = endpoint.charAt(1).toUpperCase() + endpoint.slice(2);
            throw new Error(`${endpoint_name} ${response.statusText} (${response.status})`);
        }

        return await response.json();

    } catch (error) {
        console.error(`Error fetching ${endpoint.slice(1)}:`, error)
    }
}

// each endpoint function uses an arrow function.
// shorthand way of writing functions
const api = {
    read_root: () => fetchData(""),
    read_customization: (customization_id) => fetchData("/customization", customization_id),
    read_favorite: (favorites_id) => fetchData("/favorite", favorites_id),
    read_chipset: (chipset_id) => fetchData("/chipset", chipset_id),
    read_model: (model_id) => fetchData("/model", model_id),
    read_device: (device_id) => fetchData("/device", device_id),
    read_benchmark: (benchmark_id) => fetchData("/benchmark", benchmark_id),
    filter_benchmarks: (device, library, sort, order) => filter_benchmarks("/benchmark", device, library, sort, order),
    filter_models: (name, end_point, input_resolution, sort, order) => filter_models("/model", name, end_point, input_resolution, sort, order),
    get_current_user: () => get_current_user(),
    login: (username, password) => login(username, password),
    signup: (username, password, firstname, lastname, email) => signup(username, password, firstname, lastname, email),
    filter_devices: (name) => filter_devices("/device", name),
    filter_libraries: (name) => filter_libraries("/library", name)
};

export default api