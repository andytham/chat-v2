import chatSocket from '../helpers/chat-socket';
import React from 'react';
let name = localStorage.getItem("username")
const ChatLog = React.memo(function ChatLog (props) {
	let count = 0;
	let log = props.log.map(entry => {
		if(entry.usr == "server") {
			return(
				<div key={count++}> <span className="server">{entry.usr}</span> {entry.tme ? <span className="message-time">({entry.tme})</span> : "" }: {entry.msg}</div>
			)
		} else if (entry.usr != name){
			<div key={count++}> <span className="user-other">{entry.usr}</span> <span className="message-time">({entry.tme})</span>: {entry.msg}</div>
		}else {
			return(
				<div key={count++}> <span className="user">{entry.usr}</span> <span className="message-time">({entry.tme})</span>: {entry.msg}</div>
			)
		}

	})
	return log
	// return (<div>	</div>)
})

export default ChatLog;