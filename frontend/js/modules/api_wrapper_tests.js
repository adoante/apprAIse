/*
Understanding '.then()':
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
*/

import api from './api_wrapper.js';

// Always passes
api.read_root()
	.then(data => {
		console.log(JSON.stringify(data));
	})
	.catch(error => {
		error.message;
	});

// Read User Tests

// Should pass
api.read_user(0)
	.then(data => {
		console.log(JSON.stringify(data));
	})
	.catch(error => {
		console.log(error.message);
	});

// Should fail
api.read_user(-1)
	.then(data => {
		console.log(JSON.stringify(data));
	})
	.catch(error => {
		console.log(error.message);
	});