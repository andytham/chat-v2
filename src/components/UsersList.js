import React from 'react';
import { connect } from 'react-redux';
import { sessionsActions } from '../redux/actions';
import { sessionsService } from '../redux/services';
import axios from 'axios'
import { timeGet } from '../../server/helpers';

class UsersList extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			sessionsLoaded: false
		}
		this.getTest = this.getTest.bind(this)
		this.mapUsers = this.mapUsers.bind(this)
	}
	componentDidMount(){
	}
	componentDidUpdate(prevProps, prevState){
		const { dispatch } = this.props;
		if(this.props.sessions && !this.state.sessionsLoaded){
			let sessions = this.props.sessions;
			let user = {
				username: this.props.username,
				lastOnline:  timeGet("full"),
				currentStatus: "online"
			}
			if(sessions[this.props.username]){
				dispatch(sessionsActions.updateSession(user))
			} else {
				dispatch(sessionsActions.createSession(user))
			}
			this.setState({
				sessionsLoaded: true
			})
		}
	}
	getTest(){
		const { dispatch } = this.props;
		dispatch(sessionsActions.getSessions())
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