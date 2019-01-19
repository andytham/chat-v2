import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChatLog from './ChatLog';
import chatSocket from '../chat-socket';

//auth0


class Chatroom extends Component {
	constructor(){
		super();
		this.state = {
			input: "",
			chatSocket: chatSocket(),
			log: []
		}
		this.renderChat = this.renderChat.bind(this);
		this.onInput = this.onInput.bind(this);
		this.onSendMessage = this.onSendMessage.bind(this);
	} 
	componentDidMount(){

	}
		
	onInput(e){
		this.setState({
			input: e.target.value
		})
	}
	
	onSendMessage(){
		let newDate = new Date();
		let currentTime = newDate.getHours() + ":" + newDate.getMinutes() + ":"+ newDate.getSeconds();
		let msg = {
			usr: "Current User",
      msg: this.state.input, 
      tme: currentTime
		}
		this.state.chatSocket.message(msg, (err) => {
			return console.log(err);
		})
	}

	render(){
		return(
			<div className="chatroom">
				<div className="chat-window">
					<div className="chat-title">
					</div>
					<ul className="chat-history">
						<ChatLog />
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
export default Chatroom;