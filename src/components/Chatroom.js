import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { updateChatHistory } from '../redux/actions/index';

const mapDispatchToProps = dispatch => {
	return {
		updateChatHistory: chatHistory => dispatch(updateChatHistory(chatHistory))
	}
}

class ConnectedChatroom extends Component {
	constructor(){
		super();
		this.state = {

		}
		this.renderChat = this.renderChat.bind(this);
	} 

	renderChat(){
		let count = 0;
		
	}
	render(){
		return(
			<div className="chatroom">
				<div className="chat-window">
					<div className="chat-title">
					</div>
					<ul className="chat-history">

					</ul>
					<div className="input-wrapper">
						<TextField 
							className="chat-input"
							autoFocus={true}
							placeholder="Enter a message."
							rows={4}
							rowsMax={4}
							// onChange={this.onInput}
							// value={this.state.input}
							// onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
						/>
						<Button>
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