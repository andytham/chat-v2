import React from 'react';
import { connect } from 'react-redux';
import { sessionsActions } from '../redux/actions';
import { timeGet } from '../../server/helpers';
import Select from 'react-select';
import chatSocket from '../helpers/chat-socket';
import { Logout } from './Logout';
import Night from './Night';
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
			myStatus: "online",
			chatSocket: chatSocket()
		}
		this.getTest = this.getTest.bind(this)
		this.mapUsers = this.mapUsers.bind(this)
		this.handleList = this.handleList.bind(this)
		this.handleMyStatus = this.handleMyStatus.bind(this)
	}

	componentDidUpdate(prevProps, prevState){
		const { dispatch } = this.props;
		if(this.props.sessions && !this.state.sessionsLoaded){
			let user = {
				username: this.props.username,
				lastOnline:  timeGet("full"),
				currentStatus: "online"
			}
			if(this.props.allUsers[this.props.username]){
				dispatch(sessionsActions.updateSession(user))
				this.state.chatSocket.updateStatus()
			} else {
				dispatch(sessionsActions.createSession(user))
				this.state.chatSocket.updateStatus()
			}
			this.setState({
				sessionsLoaded: true
			})
		}

		//if user changes his status
		if (prevState.myStatus != this.state.myStatus){
			let user = {
				username: this.props.username,
				lastOnline:  timeGet("full"),
				currentStatus: this.state.myStatus
			}
			dispatch(sessionsActions.updateSession(user))
			this.state.chatSocket.updateStatus()
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
		//output the session as an element
		function mapOut(session){
			//postgres outputs UTC, this is the workaround for it
			let adjustForUTC = session.lastOnline.split(' ');
			let day = adjustForUTC[0];
			let clock = adjustForUTC[1];
			let splitTime = clock.split(":")
			let offset = -(new Date().getTimezoneOffset() / 60)
			if (parseInt(splitTime[0]) < -offset){
				splitTime[0] = parseInt(splitTime[0]) + 24;
			}
			splitTime[0] = parseInt(splitTime[0]) + parseInt(offset);
			let newTime = splitTime.join(":")

			return(
				<li key={count++} className="individual-user" data-status={session.currentStatus}>
					<div className="user-details">
						<div className="user-last-online">
							<div className="tooltip-wrapper">
								<span className="tooltip">
									<span className="last-online-header">Last Online:<br/></span>
									{day} {newTime}
								</span> 
							</div>
						</div>
						<span className="user-username">
							{session.username}
						</span>
					</div>
					<div className={`user-status ${session.currentStatus}`}>
						{session.currentStatus}
					</div>
				</li>
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
				<div className="action-panel">
					<Logout />
					<Night />
				</div>
				<div className="users-list-panel">
					<div className="select-wrapper">
						<Select
							className="select-my-status"
							value={this.state.viewList}
							onChange={this.handleMyStatus}
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
					<ul className="users-list">
						{this.props.sessions ? this.mapUsers() : ""}
					</ul>
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