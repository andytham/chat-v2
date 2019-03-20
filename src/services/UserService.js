import config from 'config'; //webpack externals
import { history } from '../helpers/history';
import axios from 'axios';
export const userService = {
	register: function(user){
		return axios.post(
			`${config.API_URL}/users/create`,
			{...user})
		.then(res => {
			console.log(res);
			if (res.data.success){
				history.push('/login')
				return res.data;
			} else {
				return res.data;
			}
		})
		.catch(err => console.log(err))
	},
	login: function(username, password){
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		};
	
		return fetch(`${config.API_URL}/users/authenticate`, requestOptions)
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
	},
	logout: function(){
		localStorage.removeItem('username');
		//Session logout aken care of in Chatroom.js
	}
}

function handleResponse(response) {
	return response.text().then(text => {
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