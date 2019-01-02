import { UPDATE_CHAT_HISTORY } from '../constants/action-types';

export const updateChatHistory = chatHistory => ({
	type: UPDATE_CHAT_HISTORY, payload: chatHistory
});