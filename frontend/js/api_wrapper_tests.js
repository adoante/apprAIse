/*
Understanding '.then()':
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
*/

import api from './modules/api_wrapper.js';

// async function signupUser(username, password, firstname, lastname, email) {
//     const data = await api.signup(username, password, firstname, lastname, email);
    
//     if (data && data.message === `User: ${username} created successfully.`) {
//         console.log("Signup successful:", data);

//         await loginUser(username, password);
//     } else {
//         console.error("Signup failed:", data);
//     }
// }

// async function loginUser(username, password) {
//     const data = await api.login(username, password);
    
//     if (data && data.access_token) {
//         localStorage.setItem("access_token", data.access_token); // Store token
//         console.log("Login successful:", data);
        
//         await api.get_current_user();
//     } else {
//         console.error("Login failed!");
//     }
// }

// signupUser("adoante113211", "password", "Adolfo", "Gante", "adolfogante@gmail.com");


// async function getAllBenchmarks() {
//     try {
// 		const device = "";
//         const library = "";
//         const sort = "";
//         const order = "desc"; // or "asc"

//         const benchmarks = await api.filter_benchmarks(device, library, sort, order);
//         console.log("All Benchmarks:", JSON.stringify(benchmarks));
//     } catch (error) {
//         console.error("Error fetching all benchmarks:", error);
//     }
// }

// // Call the function
// getAllBenchmarks();

// async function getAllModels() {
//     try {
// 		const name = "";
//         const end_point = "";
//         const input_resolution = ""
//         const sort = "";
//         const order = "desc"; // or "asc"

//         const benchmarks = await api.filter_models(name, end_point, input_resolution, sort, order);
//         console.log("All Models:", JSON.stringify(benchmarks));
//     } catch (error) {
//         console.error("Error fetching all models:", error);
//     }
// }

// // Call the function
// getAllModels();



// // Always passes - Root API test
// api.read_root()
//     .then(data => {
//         console.log("Root API Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Read User Tests

// // Should pass
// api.read_user(0)
//     .then(data => {
//         console.log("User 0 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Should fail
// api.read_user(-1)
//     .then(data => {
//         console.log("User -1 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Read Customization Tests

// // Should pass
// api.read_customization(0)
//     .then(data => {
//         console.log("Customization 0 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Should fail
// api.read_customization(-1)
//     .then(data => {
//         console.log("Customization -1 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Read Favorite Tests

// // Should pass
// api.read_favorite(0)
//     .then(data => {
//         console.log("Favorite 0 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Should fail
// api.read_favorite(-1)
//     .then(data => {
//         console.log("Favorite -1 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Read Chipset Tests

// // Should pass
// api.read_chipset(0)
//     .then(data => {
//         console.log("Chipset 0 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Should fail
// api.read_chipset(-1)
//     .then(data => {
//         console.log("Chipset -1 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Read Model Tests

// // Should pass
// api.read_model(0)
//     .then(data => {
//         console.log("Model 0 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Should fail
// api.read_model(-1)
//     .then(data => {
//         console.log("Model -1 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Read Device Tests

// // Should pass
// api.read_device(0)
//     .then(data => {
//         console.log("Device 0 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Should fail
// api.read_device(-1)
//     .then(data => {
//         console.log("Device -1 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Read Benchmark Tests

// // Should pass
// api.read_benchmark(0)
//     .then(data => {
//         console.log("Benchmark 0 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// // Should fail
// api.read_benchmark(-1)
//     .then(data => {
//         console.log("Benchmark -1 Response:", JSON.stringify(data));
//     })
//     .catch(error => {
//         console.log(error.message);
//     });