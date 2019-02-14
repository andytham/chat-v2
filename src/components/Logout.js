import React from 'react';
import { connect } from 'react-redux';
import { userActions, sessionsActions } from '../redux/actions';
class Logout extends React.Component {
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		const { dispatch } = this.props;
		if(localStorage.getItem('user')){
			let user = {
				username: this.props.username,
				lastOnline:  timeGet("full"),
				currentStatus: "offline"
			}
			dispatch(sessionsActions.updateSession(user))
			dispatch(userActions.logout());
		}
	}

	render(){
		return(
			<div>
				{this.props.username ? <button onClick={this.handleClick}>Logout</button> : "" }
			</div>
		)
	}
}


function mapStateToProps(state){
	const { username } = state.auth;
	return { username };
}

const ConnectedLogout = connect(mapStateToProps)(Logout);
export { ConnectedLogout as Logout };
