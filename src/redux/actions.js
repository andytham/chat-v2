//constants
export const UPDATE_CHAT_HISTORY = "UPDATE_CHAT_HISTORY";

//actions
export const updateChatHistory = chatHistory => ({
	type: UPDATE_CHAT_HISTORY, payload: chatHistory
});

export const updateTest = (socket, usr, msg, tme) => {
	return (dispatch) => {
		let testMsg = {
			usr: usr,
			msg: msg,
			tme: tme
		}
		socket.message('message', testMsg)
	}
}

import userContants from './constants';
import userService from './services';

export const userActions = {
	login,
	logout
}

function login(username, password) {
	return dispatch => {
		dispatch(request({ username }))
		userService.login(username, password)
			.then(
				user => {
					dispatch(success(user));
					// history.push('/')
				},
				error => {
					dispatch(failure(error.toString()));
				}
			)
	}

	function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
	function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
	userService.logout();
	return { type: userConstants.LOGOUT };
}