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
			if(this.props.allUsers[this.props.username]){
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
		// dispatch(sessionsActions.getSessions())
		console.log('props from userslist');
		console.log(this.props);
	}

	mapUsers(){
		// console.log(this.props.sessions, "heyo map");
		let count = 0
		return this.props.sessions.map(
			session => {
					return(
						<div key={count++}>{session.username} {session.lastOnline} {session.currentStatus}
						
						</div>
					)
			}
		)
	}
	render(){
		return(
			<div className="users-list">
				{this.props.sessions ? this.mapUsers() : ""}
				<button onClick={this.getTest}>GET SESSIONS</button>
			</div>
		)
	}
}


function mapStatetoProps(state) {
	const { sessions, allUsers } = state.sessions;
	const { username } = state.auth;
	return{
		sessions,
		allUsers,
		username
	}
}

const ConnectedUsersList = connect (mapStatetoProps)(UsersList)
export { ConnectedUsersList as UsersList };