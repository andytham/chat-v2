import React from 'react';
import { connect } from 'react-redux';

class SystemMsg extends React.Component {
	render(){
		return(
			<div className="error system-msg">
				{this.props.systemMsg ? this.props.systemMsg : ""}
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