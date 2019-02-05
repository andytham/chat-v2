import config from 'config'; //webpack externals

export const userService = {
	login,
	logout
}

function login(username, password){
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	};

	return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
		.then(handleResponse)
		.then(data => {
			console.log("returned res from fetch:", data);
			let parsed = JSON.parse(data);
			let { user, token } = parsed;
			
			localStorage.setItem('username', user);
			localStorage.setItem('token', token)
			localStorage.setItem('user', data)
			// jwtRequest()
			return user;
		})
		.catch(err => {
			console.log(err);
		})

		function jwtRequest(url, token){
			var req = new XMLHttpRequest();
			req.open('get', url, true);
			req.setRequestHeader('Authorization', 'Bearer', token);
			res.send();
		}
}

function logout(){
	localStorage.removeItem('user');
	localStorage.removeItem('username');
	localStorage.removeItem('token');
}


function handleResponse(response) {
	console.log("this is the response after fetch", response);
	return response.text().then(text => {
			// const data = text && JSON.parse(text);
			// console.log(data);
			const data = text
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