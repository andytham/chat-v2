import chatSocket from '../chat-socket';
import React from 'react';
const ChatLog = function ChatLog (props) {
	console.log(props);
	// let log = props.log.map(entry => {
	// 	if(entry.usr == "server") {
	// 		return(
	// 			<div>{entry.usr}{entry.time ? `(${entry.time})` : "" }: {entry.msg}</div>
	// 		)
	// 	} else {
	// 		return(
	// 			<div>{entry.usr} ({entry.time}): {entry.msg}</div>
	// 		)
	// 	}

	// })
	// return log
	return (<div>	</div>)
}

export default ChatLog;