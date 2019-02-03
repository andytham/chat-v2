import { UPDATE_CHAT_HISTORY } from "./actions";

const initialState = {
	chatHistory: [
		{
			usr: "server",
			msg: "Welcome to the chatroom!",
			tme: ""
		}
	]
}

export const rootReducer = combineReducers({
	auth,
	chat
})


export function chat(state = initialState, action){
	switch (action.type) {
		case UPDATE_CHAT_HISTORY:
			return { ...state, chatHistory: [...state.chatHistory, action.payload]};
		default:
			return state;
	}
};
export default rootReducer;

import userConstants from './constants';
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
			return {};
		default: 
			return state;
	}
}