import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ChatLog from './ChatLog';
import { UsersList } from './UsersList';
import Game from './Game';
import socket from '../helpers/socket';
import { timeGet }  from '../../server/helpers';
import { connect } from 'react-redux';
import { sessionsActions } from '../actions';


class Chatroom extends Component {
	constructor(){
		super();
		this.state = {
			input: "",
			socket: socket(),
			log: [],
			username: ""
		}
    this.chat = React.createRef();
		this.onInput = this.onInput.bind(this);
		this.updateChatLog = this.updateChatLog.bind(this);
		this.onSendMessage = this.onSendMessage.bind(this);
		this.afterUpdate = this.afterUpdate.bind(this);
		this.handleUnload = this.handleUnload.bind(this);
	} 
	componentDidMount(){

		this.state.socket.receive(this.updateChatLog)
		this.state.socket.onStatusUpdate(this.afterUpdate)
		this.state.socket.join(this.props.username || localStorage.getItem('username'))
	}
	componentWillUnmount(){
		const { dispatch } = this.props
		let user = {
			username: this.props.username,
			lastOnline:  timeGet("full"),
			currentStatus: "offline"
		}
		let disconnectMsg = {
			usr: "server",
			msg: this.props.username + " has disconnected.",
			tme: timeGet()
		}
		dispatch(sessionsActions.updateSession(user))
		this.state.socket.message(disconnectMsg)
		this.state.socket.updateStatus({online: false});
	}
	componentDidUpdate(){
    //auto scroll chat to the newest line
		if(this.state.log){
      this.chat.current.scrollTo(0, this.chat.current.scrollHeight)
    }
	}
	handleUnload(e){

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
		const { dispatch } = this.props
		if (msg.usr == "server"){
			console.log("I should be updating session");
			setTimeout(poop, 5000)
		}
		function poop (){
			dispatch(sessionsActions.getSessions())
		}
	}
	afterUpdate(){
		const { dispatch } = this.props
		setTimeout(poop, 10)
		function poop (){
			dispatch(sessionsActions.getSessions())
		}
	}

	onSendMessage(){
		let whisper = ["/whisper", "/message", "/m", "/w"]
		if(/^\//.test(this.state.input)){ // start of string is slash
			let string = this.state.input;
			let split = string.split(' ');
			let index = string.indexOf(' ', 3);
			let text = string.slice(index, string.length);
			let cmd = split[0];
			let target = split[1];
			if(whisper.includes(cmd)){
				console.log('attempting whisper');
				if (split.length > 2){
					let msg = {
						usr: this.props.username,
						tme: timeGet(),
						msg: "Please include a message.",
						err: true
					}
					this.updateChatLog(msg)
					this.setState({
						input: ""
					})
				} else	if (target == this.props.username) {
					let msg = {
						usr: this.props.username,
						tme: timeGet(),
						msg: "You can't send yourself a private message, silly.",
						err: true
					}
					this.updateChatLog(msg)
					this.setState({
						input: ""
					})
				} else if (this.props.allUsers[target] == "online" || this.props.allUsers[target] == "away"){
					console.log("Whispering", target);
					let msg = {
						usr: this.props.username || localStorage.getItem('username'),
						// usr: this.props.username,
						msg: text, 
						tme: timeGet(),
						target: target
					}
					this.state.socket.whisper(msg)
					let note = {
						usr: target,
						// usr: this.props.username,
						msg: text, 
						tme: timeGet(),
						whisper: true
					}
					this.updateChatLog(note)
					this.setState({
						input: ""
					})
				} else {
					let msg = {
						usr: this.props.username,
						tme: timeGet(),
						msg: "User not found.",
						err: true
					}
					this.updateChatLog(msg)
					this.setState({
						input: ""
					})
				}
			} else {
				let msg = {
					usr: this.props.username,
					tme: timeGet(),
					msg: "Command not recognized.",
					err: true
				}
				this.updateChatLog(msg)
				this.setState({
					input: ""
				})
			}
		} else if (/\S/.test(this.state.input)) { // check !whitespace
			let msg = {
				usr: this.props.username || localStorage.getItem('username'),
				// usr: this.props.username,
				msg: this.state.input, 
				tme: timeGet()
			}
			this.state.socket.message(msg, (err) => {
				return console.log(err);
			})
			this.updateChatLog(msg)
			this.setState({
				input: ""
			})
		} else {
			this.setState({
				input: ""
			})
		}
	}

	render(){
		return(
			<div className="chatroom">
				<div className="game-wrapper">
					<Game />
					<div className="game-overlay">
						<div id="overlay-text">	Click in the game window in order to move!</div>
					</div>
					<UsersList />
				</div>
				<div className="chat-window">
					<div className="chat-title">
					</div>
					<ul className="chat-log" ref={this.chat}>
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
						<Button className="chat-button" onClick={this.onSendMessage}>
							Enter
						</Button>
					</div>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	const { isLoggedIn, username } = state.auth;
	const { allUsers } = state.sessions;
	return {
		isLoggedIn,
		username,
		allUsers
	};
}

const ConnectedChatroom = connect(mapStateToProps)(Chatroom)
export { ConnectedChatroom as Chatroom };