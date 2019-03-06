let user;
user = localStorage.getItem('user');
const initialState = user ? { isLoggedIn: false, user } : {};
// const initialState = {};

import { userConstants } from '../constants';
export function auth(state = initialState, action){
	switch (action.type){
		case userConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				// username: action.username.username, //???????? why does this need to be nested? addressed in devlog
				systemMsg: "",
			}
		case userConstants.LOGIN_SUCCESS:
			return {
				isLoggedIn: true,
				username: action.username
			}
		case userConstants.LOGIN_FAILURE:
			return {
				systemMsg: ["Login failed. Incorrect username or password."]
			};
		case userConstants.LOGOUT:
			return {
				isLoggedIn: false,
				username: ""
			};
		case userConstants.REGISTER_REQUEST:
			return {
				systemMsg: "",
				registering: true
			}
		case userConstants.REGISTER_SUCCESS:
			return {
				registered: true
			}
		case userConstants.REGISTER_FAILURE:
			return {
				systemMsg: action.register
			}
		default: 
			return state;
	}
}