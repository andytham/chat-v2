import React from 'react';
import { connect } from 'react-redux';
import { userActions, sessionsActions } from '../redux/actions';
import { timeGet } from '../../server/helpers';
import Button from '@material-ui/core/Button';
import chatSocket from '../helpers/chat-socket';

class Logout extends React.Component {
	constructor(){
		super();
		this.state = {
			chatSocket: chatSocket()
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		const { dispatch } = this.props;
		// if(localStorage.getItem('user')){
		if(this.props.username){
			let user = {
				username: this.props.username,
				lastOnline:  timeGet("full"),
				currentStatus: "offline"
			}
			dispatch(sessionsActions.updateSession(user))
			dispatch(userActions.logout());
		}
		this.state.chatSocket.updateStatus({online: false});
	}

	render(){
		return(
			<div>
				{this.props.username ?
					<Button className="button logout" onClick={this.handleClick}>
						Logout
					</Button>
					: "" 
				}
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
