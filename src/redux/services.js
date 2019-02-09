import config from 'config'; //webpack externals
import { history } from './helpers';

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
			let parsed = JSON.parse(data);
			let { username, token } = parsed;
			localStorage.setItem('username', username);
			return username;
		})
		.catch(err => {
			console.log(err);
		})
}

function logout(){
	localStorage.removeItem('username');
	//PUT/POST to sessions table? who's online and what not? or last online
}


function handleResponse(response) {
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

function getSessions(){
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch(`${config.apiUrl}/sessions`, requestOptions)
		.then(
			data => {return data}
		)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		})
}

function patchSession(username, lastOnline, currentStatus){
	const requestOptions = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, lastOnline, currentStatus })
	};

	fetch(`${config.apiUrl}/sessions`, requestOptions)
		.then(handleResponse)
		.then(data => {
			let parsed = JSON.parse(data);
			return parsed;
		})
		.catch(err => {
			console.log(err);
		})
}
export const sessionsService = {
	getSessions,
	patchSession
}