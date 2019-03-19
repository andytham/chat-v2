import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers/history';

function register(user){
	console.log("testing");
	return (dispatch) => {
		console.log('register action');
		dispatch({type: userConstants.REGISTER_REQUEST, user})
		userService.register(user)
			.then(data => {
				if (data){
					let register = [];
					for (let i = 0; i < data.length; i++){
						register.push(data[i].msg)
					}
					if (data.success){
						dispatch({type: userConstants.REGISTER_SUCCESS, register})
					} else {
						dispatch({type: userConstants.REGISTER_FAILURE, register})
					}
				} else {
					let register = ["Connection to server failed, try again later or contact the developer."]
					dispatch({type: userConstants.REGISTER_FAILURE, register})
				}

			})
	}
}
function login(username, password) {
	return dispatch => {
		dispatch(request({ username }))
		userService.login(username, password)
			.then(
				res => {
					if (res){
						if (res.success){
							localStorage.setItem("username", res.username)
							dispatch(success(res.username));	
							history.push('/chat')
						} else {
						dispatch(failure("Login failed."));
						}
					} else {
							let register = ["Connection to server failed, try again later or contact the developer."]
							dispatch({type: userConstants.REGISTER_FAILURE, register})
					}
				},
				error => {
					console.log("error happened");
					dispatch(failure(error.toString()));
				}
			)
	}

	function request(username) { return { type: userConstants.LOGIN_REQUEST, username } }
	function success(username) { return { type: userConstants.LOGIN_SUCCESS, username } }
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

}

function logout() {
	return dispatch => {
		userService.logout(); // only removes localstorage atm
		dispatch({ type: userConstants.LOGOUT })
		history.push('/login')
	}
}

export const userActions = {
	login,
	logout,
	register
}