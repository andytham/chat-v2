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
				systemMsg: "Login failed. Incorrect username or password."
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
				systemMsg: action.register.message
			}
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
        // sessions: {
				// 	...state.sessions,
				// 	[action.user.username]: {
				// 		lastOnline: action.user.lastOnline,
				// 		currentStatus: action.user.currentStatus
				// 	}
				// },
				sessions: [
					...state.sessions,
					{
						username: action.user.username,
						lastOnline: action.user.lastOnline,
						currentStatus: action.user.currentStatus
					}
				],
				allUsers: {
					...state.allUsers,
					[action.user.username]: 1
				}
			}
		case sessionsConstants.REQUEST:
			//create object, easier to look up, rather than looping
			let sessionsObject = {};
			let sessionsArr = [];
			for (let i = 0; i < action.sessions.length; i++){
				//better looking time format
				let timestamp = action.sessions[i].last_online;
				let dateTime = timestamp.split('T');
				let leftHand = dateTime[0]
				let tempTime = dateTime[1].split(/[.,]/)
				let rightHand = tempTime[0];

				let newTimestamp = leftHand + " " + rightHand;
				// sessionsObject[action.sessions[i].username] = {
				// 	lastOnline: newTimestamp,
				// 	currentStatus: action.sessions[i].current_status
				// }
				sessionsObject[action.sessions[i].username] = 1
				sessionsArr.push({
					username: action.sessions[i].username,
					lastOnline: newTimestamp,
					currentStatus: action.sessions[i].current_status
				})
			}
			return {
				sessions: [...sessionsArr],
				allUsers: {...sessionsObject}

			}
		case sessionsConstants.UPDATE:
			return {
        // sessions: {
				// 	...state.sessions,
				// 	[action.user.username]: {
				// 		lastOnline: action.user.lastOnline,
				// 		currentStatus: action.user.currentStatus
				// 	}
				// },
				sessions: [
					...state.sessions,
					{
						username: action.user.username,
						lastOnline: action.user.lastOnline,
						currentStatus: action.user.currentStatus
					}
				],
				allUsers: {
					...state.allUsers,
					[action.user.username]: 1
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