import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { updateChatHistory, updateTest } from '../redux/actions/index';

import chatSocket from '../helpers/chat-socket';

//auth0

const mapDispatchToProps = dispatch => {
	return {
		updateChatHistory: (chatHistory) => {dispatch(updateChatHistory(chatHistory))},
		updateTest: dispatch(updateTest)
	}
}

const mapStateToProps = state => {
	return { chatHistory: state.chatHistory };
}
const ConnectChatHistory = ({ chatHistory }) => {
	let history = chatHistory.map(entry => {
		if(entry.usr == "server") {
			return(
				<div>{entry.usr}{entry.time ? `(${entry.time})` : "" }: {entry.msg}</div>
			)
		} else {
			return(
				<div>{entry.usr} ({entry.time}): {entry.msg}</div>
			)
		}

	})
	return(history)
}
const ChatHistory = connect(mapStateToProps)(ConnectChatHistory);

class ConnectedChatroom extends Component {
	constructor(){
		super();
		this.state = {
			input: "",
			chatSocket: chatSocket(),
		}
		this.renderChat = this.renderChat.bind(this);
		this.onInput = this.onInput.bind(this);
		this.onSendMessage = this.onSendMessage.bind(this);
	} 
	componentDidMount(){

	}
		
	renderChat(){
		let count = 0;
		
	}

	onInput(e){
		this.setState({
			input: e.target.value
		})
	}
	
	onSendMessage(){
		let newDate = new Date();
		let currentTime = newDate.getHours() + ":" + newDate.getMinutes() + ":"+ newDate.getSeconds();
		this.state.chatSocket.message({
			// usr: this.state.username,
			usr: "Current User",
      msg: this.state.input, 
      tme: currentTime
		}, (err) => {
			return console.log(err);
		})
		this.props.updateChatHistory({
			usr: "Current User",
			msg: this.state.input,
			tme: currentTime
		})
		this.props.dispatch(updateTest(chatSocket, "test", "msg", "tme"));
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
						<ChatHistory />
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
			</div>
		)
	}
}
const Chatroom = connect(null, mapDispatchToProps)(ConnectedChatroom)
export default Chatroom;