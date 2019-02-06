import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChatLog from './ChatLog';
import chatSocket from '../helpers/chat-socket';
import { timeGet }  from '../../server/helpers';

class Chatroom extends Component {
	constructor(){
		super();
		this.state = {
			input: "",
			chatSocket: chatSocket(),
			log: []
		}
		this.onInput = this.onInput.bind(this);
		this.updateChatLog = this.updateChatLog.bind(this);
		this.onSendMessage = this.onSendMessage.bind(this);
	} 
	componentDidMount(){
		this.state.chatSocket.receive(this.updateChatLog)

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
	}

	onSendMessage(){
		let msg = {
			usr: "Current User",
      msg: this.state.input, 
      tme: timeGet()
		}
		this.state.chatSocket.message(msg, (err) => {
			return console.log(err);
		})
		this.updateChatLog(msg)
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
			</div>
		)
	}
}

export default Chatroom;