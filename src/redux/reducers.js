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
				username: action.username.username //???????? why does this need to be nested? addressed in devlog
			}
		case userConstants.LOGIN_SUCCESS:
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
					...state.sessions,
					[action.user.username]: {
						lastOnline: action.user.lastOnline,
						currentStatus: action.user.currentStatus
					}
				}
			}
		case sessionsConstants.REQUEST:
			//create object, easier to look up, rather than looping
			let sessionsObject = {};
			for (let i = 0; i < action.sessions.length; i++){
				//better looking time format
				let timestamp = action.sessions[i].last_online;
				let dateTime = timestamp.split('T');
				let leftHand = dateTime[0]

				let tempTime = dateTime[1].split('.')
				let splitTime = tempTime[0].split(':')
				let tH = splitTime[0];
				let tM = splitTime[1];
				let tS = splitTime[2];
				// let rightHand = tempTime;
				let rightHand;
				if (Number(tH) > 12){
					let newHour = Number(tH) - 12;
					rightHand = newHour + ":" + tM + ":" + tS + " PM" 
				} else {
					rightHand = tH + ":" + tM + ":" + tS + " AM" 
				}

				let newTimestamp = leftHand + " " + rightHand;
				sessionsObject[action.sessions[i].username] = {
					lastOnline: newTimestamp,
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
					...state.sessions,
					[action.user.username]: {
						lastOnline: action.user.lastOnline,
						currentStatus: action.user.currentStatus
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