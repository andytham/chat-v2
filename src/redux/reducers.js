import { UPDATE_CHAT_HISTORY } from "../actions/index";

const initialState = {
	chatHistory: [
		{
			usr: "server",
			msg: "Welcome to the chatroom!",
			tme: ""
		}
	]
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CHAT_HISTORY:
			return { ...state, chatHistory: [...state.chatHistory, action.payload]};
		default:
			return state;
	}
};

export default rootReducer;