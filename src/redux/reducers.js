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
const initialState = user ? { loggedIn: true, user } : {};

export const rootReducer = combineReducers({
	auth,
	chat
})


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
				user: action.user
			}
		case userConstants.LOGIN_SUCESS:
			return {
				loggedIn: true,
				user: action.user
			}
		case userConstants.LOGIN_FAILURE:
			return {};
		case userConstants.LOGOUT:
			return {
				loggedIn: false
			};
		default: 
			return state;
	}
}