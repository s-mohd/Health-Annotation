export default async function call(method, args = {}) {
	// Headers setup
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=utf-8',
		'X-Frappe-Site-Name': window.location.hostname
	};

	if (window.csrf_token && window.csrf_token !== '{{ csrf_token }}') {
		headers['X-Frappe-CSRF-Token'] = window.csrf_token;
	}

	try {
		// Start the request
		const res = await fetch(`/api/method/${method}`, {
			method: 'POST',
			headers,
			body: JSON.stringify(args)
		});

		// If request is successful
		if (res.ok) {
			const data = await res.json();
			// Return the response data
			if (data.docs || method === 'login') {
				return data;
			}
			return data.message;
		} else {
			// Handle errors
			const response = await res.text();
			const error = tryParseJSON(response);

			// Create a descriptive error message
			let errorMessage = `${method} failed: ${error.exc_type || 'Unknown error'}`;
			if (error._error_message) {
				errorMessage += `\n${error._error_message}`;
			}

			// Throw the constructed error
			throw new Error(errorMessage);
		}
	} catch (error) {
		// Handle unexpected errors
		console.error("An error occurred:", error);
		throw error; // Re-throw the error so it can be caught by the caller
	}
}

// Utility function to safely parse JSON
function tryParseJSON(jsonString) {
	try {
		return JSON.parse(jsonString);
	} catch (e) {
		return {}; // Return empty object if parsing fails
	}
}
