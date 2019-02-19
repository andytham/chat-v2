import React from 'react';
import { connect } from 'react-redux';

class ErrorMsg extends React.Component {
	render(){
		return(
			<div className="error">
				{this.props.error ? this.props.error : ""}
			</div>
		)
	}
}
function mapStateToProps(state){
	const { error } = state.auth;
	return {
		error
	}
}

const connectedErrorMsg = connect(mapStateToProps)(ErrorMsg);
export { connectedErrorMsg as ErrorMsg }