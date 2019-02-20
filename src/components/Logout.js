import React from 'react';
import { connect } from 'react-redux';
import { userActions, sessionsActions } from '../redux/actions';
import { timeGet } from '../../server/helpers';
import Button from '@material-ui/core/Button';
import { history } from '../redux/helpers'

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
		history.push('/login');
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
