import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ChatLog from './ChatLog';
import { UsersList } from './UsersList';

import chatSocket from '../helpers/chat-socket';
import { timeGet }  from '../../server/helpers';
import { connect } from 'react-redux';
import { sessionsActions } from '../redux/actions';


class Chatroom extends Component {
	constructor(){
		super();
		this.state = {
			input: "",
			chatSocket: chatSocket(),
			log: [],
			username: ""
		}
		this.onInput = this.onInput.bind(this);
		this.updateChatLog = this.updateChatLog.bind(this);
		this.onSendMessage = this.onSendMessage.bind(this);
	} 
	componentDidMount(){
		const { dispatch } = this.props
		let user = {
			username: this.props.username,
			lastOnline:  timeGet("full"),
			currentStatus: "online"
		}
		let disconnectMsg = {
			usr: "server",
			msg: this.props.username + " has disconnected.",
			tme: timeGet()

		}
		window.onbeforeunload = function(){
			dispatch(sessionsActions.updateSession(user))
			this.state.chatSocket.message(disconnectMsg)
			return false;
		}

		this.state.chatSocket.receive(this.updateChatLog)
		this.state.chatSocket.join(this.props.username || localStorage.getItem('username'))
	}

	onInput(e){
		this.setState({
			input: e.target.value
		})
	}

	updateChatLog(msg){
		let log = this.state.log.slice()
		log.push(msg);
		this.setState({
			log: log
		})
		if (msg.usr == "server"){
			const { dispatch } = this.props
			dispatch(sessionsActions.getSessions())
		}
	}

	onSendMessage(){
		let msg = {
			usr: this.props.username || localStorage.getItem('username'),
			// usr: this.props.username,
      msg: this.state.input, 
      tme: timeGet()
		}
		this.state.chatSocket.message(msg, (err) => {
			return console.log(err);
		})
		this.updateChatLog(msg)
		this.setState({
			input: ""
		})
	}

	render(){
		return(
			<div className="chatroom">
				<div className="chat-window">
					<div className="chat-title">
					</div>
					<ul className="chat-history">
						<ChatLog log={this.state.log} />
					</ul>
					<div className="input-wrapper">
						<TextField 
							className="chat-input"
							autoFocus={true}
							placeholder="Enter a message."
							rows={4}
							rowsMax={4}
							onChange={this.onInput}
							value={this.state.input}
							onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
						/>
						<Button onClick={this.onSendMessage}>
							Enter
						</Button>
					</div>
				</div>
				<UsersList />
			</div>
		)
	}
}
function mapStateToProps(state) {
	const { isLoggedIn, username } = state.auth;
	return {
		isLoggedIn,
		username
	};
}

const ConnectedChatroom = connect(mapStateToProps)(Chatroom)
export { ConnectedChatroom as Chatroom };