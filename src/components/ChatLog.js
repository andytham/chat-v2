import chatSocket from '../helpers/chat-socket';
import React from 'react';
let name = localStorage.getItem("username")
const ChatLog = React.memo(function ChatLog (props) {
	let count = 0;
	let className;
	let log = props.log.map(entry => {
		if (entry.usr == "server"){
			className = "msg-user-server";
		} else if (entry.usr == name) {
			className = "msg-user-you";
		} else {
			className = "msg-user-other";
		}
		return(
			<div key={count++}> <span className={className}>{entry.usr}</span> {entry.tme ? <span className="msg-time">({entry.tme})</span> : "" }: {entry.msg}</div>
		)


	})
	return log
	// return (<div>	</div>)
})

export default ChatLog;