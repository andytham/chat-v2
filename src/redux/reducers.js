import { UPDATE_CHAT_HISTORY } from "./actions";
import { combineReducers } from 'redux';

const chatInitialState = {
	chatHistory: [
		{
			usr: "server",
			msg: "Welcome to the chatroom!",
			tme: ""
		}
	]
}

// let user = JSON.parse(localStorage.getItem('user'));
let user = localStorage.getItem('user')
// let currentUser;
// let getUser = async () => {
// 	await fetch('/users/current')
// 	.then((username)=>{
// 		currentUser = username;
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	})
// }
// getUser()
// console.log(currentUser, "this is current user...");

const initialState = user ? { isLoggedIn: true, user } : {};
// const initialState = {};




export function chat(state = chatInitialState, action){
	switch (action.type) {
		case UPDATE_CHAT_HISTORY:
			return { ...state, chatHistory: [...state.chatHistory, action.payload]};
		default:
			return state;
	}
};

import { userConstants } from './constants';
export function auth(state = initialState, action){
	switch (action.type){
		case userConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				username: action.username.username //???????? why is this nested
			}
		case userConstants.LOGIN_SUCESS:
			return {
				isLoggedIn: true,
				username: action.username
			}
		case userConstants.LOGIN_FAILURE:
			return {};
		case userConstants.LOGOUT:
			return {
				isLoggedIn: false,
				username: ""
			};
		default: 
			return state;
	}
}

export const rootReducer = combineReducers({
	auth,
	chat
})