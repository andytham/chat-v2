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