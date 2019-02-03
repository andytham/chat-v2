import chatSocket from '../helpers/chat-socket';
import React from 'react';
const ChatLog = React.memo(function ChatLog (props) {
	let count = 0;
	let log = props.log.map(entry => {
		if(entry.usr == "server") {
			return(
				<div key={count++}>{entry.usr}{entry.tme ? `(${entry.tme})` : "" }: {entry.msg}</div>
			)
		} else {
			return(
				<div key={count++}>{entry.usr} ({entry.tme}): {entry.msg}</div>
			)
		}

	})
	return log
	// return (<div>	</div>)
})

export default ChatLog;