import React from 'react';
let name = localStorage.getItem("username")

const ChatLog = React.memo(function ChatLog (props) {
	let usrClass, msgClass = "";
	let log = props.log.map((entry, i) => {

		let w1, w2;
		if (entry.usr == "server"){
			usrClass = "msg-user-server";
			msgClass = "msg-msg-server";
		} else if (entry.usr == name) {
			usrClass = "msg-user-you";
			msgClass = "msg-msg-you"
		} else {
			usrClass = "msg-user-other";
			msgClass = "msg-msg-other"
		}
		if (entry.whisper){
			usrClass += " whisper";
			msgClass += " whisper";
			if (entry.outgoing){
				w2 = " whispers";	
			} else {
				w1 = "to ";
			}
		}
		if (entry.err){
			return(
				<div className="entry" key={i}>
					<div className="entry-usr">
						{entry.tme ? <span className="msg-time">({entry.tme})</span> : "" }:&nbsp;
					</div>
					<div className="entry-msg err">
						<span className={msgClass}>{entry.msg}</span>
					</div>
				</div>
			)
		}
		return(
			<div className="entry" key={i}>
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