import React from 'react';
let name = localStorage.getItem("username")

const ChatLog = React.memo(function ChatLog (props) {
	let count = 0, usrClass, msgClass = "";
	let log = props.log.map(entry => {
		let w1, w2;
		if (entry.whisper){
			usrClass = "msg-user-whisper";
			msgClass = "msg-msg-whisper";
			if (entry.outgoing){
				w2 = " whispers";
			} else {
				w1 = "to ";
			}
		}	else if (entry.usr == "server"){
			usrClass = "msg-user-server";
			msgClass = "msg-msg-server";
		} else if (entry.usr == name) {
			usrClass = "msg-user-you";
			msgClass = "msg-msg-you"
		} else {
			usrClass = "msg-user-other";
			msgClass = "msg-msg-other"
		}
		return(
			<div className="entry" key={count++}>
				<div className="entry-usr">
					{entry.tme ? <span className="msg-time">({entry.tme})</span> : "" } <span className={usrClass}>{w1}{entry.usr}{w2}</span>:&nbsp;
				</div>
				<div className="entry-msg">
					<span className={msgClass}>{entry.msg}</span>
				</div>
			</div>
		)
	})
	return log
	// return (<div>	</div>)
})

export default ChatLog;