const initialSessionsState = {}; // possibly can't do a GET request as it's async

import { sessionsConstants } from '../constants';
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