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
			sessionsLoaded: false,
			selectStatus: "showOnlineOnly"
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
				console.log("patching current user");
				dispatch(sessionsActions.updateSession(user))
			} else {
				dispatch(sessionsActions.createSession(user))
			}
			this.setState({
				sessionsLoaded: true
			})
		}
		if (JSON.stringify(prevProps.sessions) != JSON.stringify((this.props.sessions))){
			dispatch(sessionsActions.getSessions())
		}
	}
	getTest(){
		const { dispatch } = this.props;
		dispatch(sessionsActions.getSessions())
		console.log('props from userslist');
		console.log(this.props);
	}

	mapUsers(){
		let count = 0
		switch (this.state.selectStatus){
			case "showOnlineOnly":
				return this.props.sessions.map(
					session => {
						if (session.currentStatus == "online"){
							return(
								<div key={count++}>
									{session.username} {session.lastOnline}
								</div>
							)
						}
					})
			case "showAway":
				return
			case "showAll":
				return
			default:
				return
		}
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