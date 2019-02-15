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
			let { username, token, success } = parsed;
			let res = {
				username: username,
				token: token,
				success: success
			}
			return res

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

import axios from 'axios';
function createSession(user){
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...user })
	}
	//working fetch version

	// fetch(`${config.apiUrl}/sessions`, requestOptions)
	// 	.then(data => {
	// 		console.log("post success?", data);
	// 	})
	// 	.then(data => {
	// 		console.log("HELLO?");
	// 	})
	// 	.catch(err => console.log(err))
	axios.post(`${config.apiUrl}/sessions`, {
		...user
	})
		.then(data => {
		console.log("post success?", data);
	})
		.catch(err => console.log(err))

}
async function getSessions(){
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};
	try {
		let resp = await axios(`${config.apiUrl}/sessions`)
		let data = resp.data;
		return data
	} catch (err){
		console.log(err);
	}
}

function patchSession(user){
	axios.patch(`${config.apiUrl}/sessions`,{...user})
		.catch(err => console.log(err))
	// const requestOptions = {
	// 	method: 'PATCH',
	// 	headers: { 'Content-Type': 'application/json' },
	// 	body: {...user}
	// };

	// fetch(`${config.apiUrl}/sessions`, requestOptions)
	// 	.then(handleResponse)
	// 	.then(data => {
	// 		let parsed = JSON.parse(data);
	// 		return parsed;
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	})
}
export const sessionsService = {
	createSession,
	getSessions,
	patchSession
}

export const registerService = {
	register: function(user){
		axios.post(
			`${config.apiUrl}/users/create`,
			{...user})
		.then(res => {
			console.log(res);
			if (res.data.success){
				history.push('/login')
			}
		})
		.catch(err => console.log(err))
	}
}