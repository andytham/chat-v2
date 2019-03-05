import { combineReducers } from 'redux';
import { auth } from './UserReducer';
import { chat } from './ChatReducer';
import { sessions } from './SessionsReducer';

export const rootReducer = combineReducers({
	auth,
	chat,
	sessions
})