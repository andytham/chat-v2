import { history } from './helpers';
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

import { userConstants } from './constants';
import { userService } from './services';

export const userActions = {
	login,
	logout
}

function login(username, password) {
	return dispatch => {
		console.log(dispatch);
		dispatch(request({ username }))
		userService.login(username, password)
			.then(
				username => {
					dispatch(success(username));	
					history.push('/chat')
				},
				error => {
					dispatch(failure(error.toString()));
				}
			)
	}

	function request(username) { return { type: userConstants.LOGIN_REQUEST, username } }
	function success(username) { return { type: userConstants.LOGIN_SUCCESS, username } }
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

}

function logout() {
	userService.logout();
	return { type: userConstants.LOGOUT };
}

import { sessionsConstants } from './constants';
import { sessionsService } from './services';

export const sessionsActions = {
	createSession,
	updateSession,
	getSessions
}

function createSession(username){
	return dispatch => {
		let lastOnline;
		let currentStatus;
		let user = {
			username,
			lastOnline,
			currentStatus
		}
		dispatch(()=>{
			return { type: sessionsConstants.CREATE, user}
		})
	}
}
function updateSession(username, lastOnline, currentStatus){
	return dispatch => {
		// let user = arguments;
		// sessionsService.patchSession(...user)

		// I feel like this is less prone to errors
		let user = {
			username,
			lastOnline,
			currentStatus
		}
		//PATCH to db
		sessionsService.patchSession(username, lastOnline, currentStatus) 


		//updates redux state
		dispatch(()=>{
			return { type: sessionsConstants.UPDATE, user}
		})
	}
}

function getSessions(){
	return async (dispatch) => {
		try {
			let sessions = await sessionsService.getSessions()
			dispatch(request())
			function request() {
				return { type: sessionsConstants.REQUEST, sessions }
			}
		} catch (err) {
			console.log(err);
		}

	}

}
