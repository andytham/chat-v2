import React from 'react';
import { connect } from 'react-redux';
import { sessionsActions } from '../redux/actions';
import { sessionsService } from '../redux/services';
import axios from 'axios'
class UsersList extends React.Component {
	constructor(props){
		super(props)
		this.mapUsers = this.mapUsers.bind(this)
	}
	componentDidMount(){
		const { dispatch } = this.props;
		if(this.props.username){
			let timestamp = new Date();
			let data = {
				username: this.props.username,
				lastOnline: timestamp.toLocaleDateString() + timestamp.toLocaleTimeString(),
				currentStatus: "online"
			}
			dispatch(sessionsActions.getSessions())
			// dispatch(sessionsActions.updateSession(data))
		}
	}


	mapUsers(){
		console.log('props from userslist');
		console.log(this.props);
	}
	render(){
		return(
			<div className="users-list">
				<button onClick={this.mapUsers}>users list</button>
				<button onClick={this.getTest}>GET SESSIONS</button>
			</div>
		)
	}
}


function mapStatetoProps(state) {
	const { sessions } = state.sessions;
	const { username } = state.auth;
	return{
		sessions,
		username
	}
}

const ConnectedUsersList = connect (mapStatetoProps)(UsersList)
export { ConnectedUsersList as UsersList };