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
			selectStatus: "showAll"
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
		let sessions = this.props.sessions.slice()
		let onlineList = [], awayList = [], offlineList = []
		//seperate into 3 lists to reorder
		for(let i = 0; i < sessions.length; i++){
			switch (sessions[i].currentStatus){
				case "online":
					onlineList.push(sessions[i]);
					break;
				case "away":
					awayList.push(sessions[i]);
					break;
				case "offline":
					offlineList.push(sessions[i]);
					break;
				default:
					break;
			}
		}
		//map out
		function mapOut(session){
				return(
					<div key={count++} className="individual-user">
						<div className="users-username">
							{session.username}
						</div>
						<div className={`users-status ${session.currentStatus}`}>
							{session.currentStatus}
						</div>
					</div>
				)
		}
		let onlineEl = onlineList.map(session => {
			return mapOut(session)
		})
		let awayEl = awayList.map(session => {
			return mapOut(session)
		})
		let offlineEl = offlineList.map(session => {
			return mapOut(session)
		})
		switch (this.state.selectStatus){
			case "showOnlineOnly":
				return onlineEl;
			case "showAway":
				return onlineEl.concat(awayEl);
			case "showAll":
				return onlineEl.concat(awayEl).concat(offlineEl);
			default:
				return onlineEl;
		}
	}
	render(){
		return(
			<div className="users-list">
				{this.props.sessions ? this.mapUsers() : ""}
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