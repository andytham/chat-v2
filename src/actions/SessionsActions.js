import { sessionsConstants } from '../constants';
import { sessionsService } from '../services';

export const sessionsActions = {
	createSession,
	updateSession,
	getSessions
}

function createSession(user){
	return dispatch => {
		sessionsService.createSession(user)
		dispatch({ type: sessionsConstants.CREATE, user})
	}
}
function updateSession(user){
	return dispatch => {
		//PATCH to db
		sessionsService.patchSession(user) 
		//updates redux state
		dispatch({ type: sessionsConstants.UPDATE, user})
	}
}

function getSessions(){
	return async (dispatch) => {
		try {
			let sessions = await sessionsService.getSessions()
			dispatch({ type: sessionsConstants.REQUEST, sessions })
		} catch (err) {
			console.log(err);
		}
	}
}