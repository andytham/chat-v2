import React from 'react';
import { connect } from 'react-redux';

class SystemMsg extends React.Component {
	constructor(){
		super();
		this.mapMsg = this.mapMsg.bind(this);
	}
	mapMsg(){
		return this.props.systemMsg.map(
			(msg, i) => {
				return (<div key={i}>{msg}</div>)
			}
		)
	}
	render(){
		return(
			<div className="error system-msg">
				{this.props.systemMsg ? this.mapMsg() : ""}
			</div>
		)
	}
}
function mapStateToProps(state){
	const { systemMsg } = state.auth;
	return {
		systemMsg
	}
}

const connectedSystemMsg = connect(mapStateToProps)(SystemMsg);
export { connectedSystemMsg as SystemMsg }