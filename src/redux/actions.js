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
	logout,
	register
}
function register(user){
	console.log("testing");
	return (dispatch) => {
		console.log('register action');
		dispatch({type: userConstants.REGISTER_REQUEST, user})
		userService.register(user)
			.then(data => {
				console.log(data);
				let register = [];
				for (let i = 0; i < data.length; i++){
					register.push(data[i].msg)
				}
				if (data.success){
					dispatch({type: userConstants.REGISTER_SUCCESS, register})
				} else {
					dispatch({type: userConstants.REGISTER_FAILURE, register})
				}
			})
	}
}
function login(username, password) {
	return dispatch => {
		dispatch(request({ username }))
		userService.login(username, password)
			.then(
				res => {
					if (res.success){
						localStorage.setItem("username", res.username)
						dispatch(success(res.username));	
						history.push('/chat')
					} else {
					dispatch(failure("Login failed."));
					}
				},
				error => {
					console.log("error happened");
					dispatch(failure(error.toString()));
				}
			)
	}

	function request(username) { return { type: userConstants.LOGIN_REQUEST, username } }
	function success(username) { return { type: userConstants.LOGIN_SUCCESS, username } }
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

}

function logout() {
	return dispatch => {
		userService.logout(); // only removes localstorage atm
		dispatch({ type: userConstants.LOGOUT })
		history.push('/login')
	}
}

import { sessionsConstants } from './constants';
import { sessionsService } from './services';

export const sessionsActions = {
	createSession,
	updateSession,
	getSessions
}

function createSession(user){
	return dispatch => {
		sessionsService.createSession(user)
		dispatch({ type: sessionsConstants.CREATE, user})
	}
}
function updateSession(user){
	return dispatch => {
		//PATCH to db
		sessionsService.patchSession(user) 
		//updates redux state
		dispatch({ type: sessionsConstants.UPDATE, user})
	}
}

function getSessions(){
	return async (dispatch) => {
		try {
			let sessions = await sessionsService.getSessions()
			dispatch({ type: sessionsConstants.REQUEST, sessions })
		} catch (err) {
			console.log(err);
		}
	}
}
