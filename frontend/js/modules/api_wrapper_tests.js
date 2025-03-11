/*
Understanding '.then()':
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
*/

import { get_root, read_user } from "./api_wrapper.js";

// Always passes
get_root()
	.then(data => {
		console.log(JSON.stringify(data));
	})
	.catch(error => {
		error.message;
	});

// Should pass
read_user(0)
	.then(data => {
		console.log(JSON.stringify(data));
	})
	.catch(error => {
		console.log(error.message);
	});

// Should fail
read_user(-1)
	.then(data => {
		console.log(JSON.stringify(data));
	})
	.catch(error => {
		console.log(error.message);
	});