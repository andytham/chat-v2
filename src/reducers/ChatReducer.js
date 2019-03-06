import { UPDATE_CHAT_HISTORY } from "../actions";

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

export function chat(state = chatInitialState, action){
	switch (action.type) {
		case UPDATE_CHAT_HISTORY:
			return { ...state, chatHistory: [...state.chatHistory, action.payload]};
		default:
			return state;
	}
};


