import React from 'react';
import { connect } from 'react-redux';
import { sessionsActions } from '../redux/actions';
import { sessionsService } from '../redux/services';
import axios from 'axios'
import { timeGet } from '../../server/helpers';
import Select from 'react-select';

const listOptions = [
	{value: 'showOnlineOnly', label: 'online'},
	{value: 'showAway', label: 'away'},
	{value: 'showAll', label: 'offline'}
]
const myStatusOptions = [
	{value: 'online', label: 'online'},
	{value: 'away', label: 'away'}
]

class UsersList extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			sessionsLoaded: false,
			viewList: "showOnlineOnly",
			myStatus: "online"
		}
		this.getTest = this.getTest.bind(this)
		this.mapUsers = this.mapUsers.bind(this)
		this.handleList = this.handleList.bind(this)
		this.handleMyStatus = this.handleMyStatus.bind(this)
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
		switch (this.state.viewList){
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
	handleList(selectedOption){
		this.setState({ viewList: selectedOption.value })
    // console.log(`Option selected:`, selectedOption);
	}
	handleMyStatus(selectedOption){
		this.setState({ myStatus: selectedOption.value })
    // console.log(`Option selected:`, selectedOption);
	}
	render(){
		return(
			<div className="users-list-wrapper">
				<div className="select-wrapper">
					<Select
						className="select-my-status"
						value={this.state.viewList}
						onChange={this.handleMystatus}
						options={myStatusOptions}
						placeholder="set status"
					/>
					<Select
						className="select-list-status"
						value={this.state.viewList}
						onChange={this.handleList}
						options={listOptions}
						placeholder="view users"
					/>
				</div>
				<div className="users-list">
					{this.props.sessions ? this.mapUsers() : ""}
				</div>
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