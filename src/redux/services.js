import config from 'config'; //webpack externals

export const userService = {
	login,
	logout
}

function login(username, password){
	const reqOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	};

	return fetch(`${config.apiUrl}/users/authenticate`, reqOptions)
		.then(handleResponse)
		.then(user => {
			console.log("returned res from fetch:", user);
			localStorage.setItem('user', user);
			return user;
		})
		.catch(err => {
			console.log(err);
		})
}

function logout(){
	localStorage.removeItem('user');
}


function handleResponse(response) {
	console.log("this is the response after fetch", response);
	return response.text().then(text => {
			const data = text && JSON.parse(text);
			if (!response.ok) {
					if (response.status === 401) {
							// auto logout if 401 response returned from api
							logout();
							location.reload(true);
					}

					const error = (data && data.message) || response.statusText;
					return Promise.reject(error);
			}

			return data;
	});
}