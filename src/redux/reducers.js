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
	
	console.log('auth',action);
	switch (action.type){
		case userConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				username: action.username.username //???????? why does this need to be nested? addressed in devlog
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
const initialSessionsState = {}; // possibly can't do a GET request as it's async

import { sessionsConstants } from './constants';
export function sessions(state = initialSessionsState, action){

	switch (action.type){
		case sessionsConstants.CREATE: //might be unnecessary since we're using objects
			return {
        sessions: {
					...state,
					[action.username]: {
						lastOnline: [action.lastOnline],
						currentStatus: [action.currentStatus]
					}
				}
			}
		case sessionsConstants.REQUEST:
			//create object, easier to look up, rather than looping
			let sessionsObject = {};
			for (let i = 0; i < action.sessions.length; i++){
				sessionsObject[action.sessions[i].username] = {
					lastOnline: action.sessions[i].last_online,
					currentStatus: action.sessions[i].current_status
				}
			}
			return {
				sessions: {
					...sessionsObject
				}
			}
		case sessionsConstants.UPDATE:
			return {
				sessions: {
					...state,
					[action.username]: {
						lastOnline: [action.lastOnline],
						currentStatus: [action.currentStatus]
					}
				}
			}
		default:
			return state;
	}
}
export const rootReducer = combineReducers({
	auth,
	chat,
	sessions
})