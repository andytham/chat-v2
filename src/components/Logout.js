import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';
class Logout extends React.Component {
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		const { dispatch } = this.props;
		if(localStorage.getItem('user')){
			dispatch(userActions.logout());
		}
	}

	render(){
		return(
			<div>
				<button onClick={this.handleClick}>Logout</button>
			</div>
		)
	}
}


function mapStateToProps(state){
	const { user } = state.auth;
	return { user };
}

const ConnectedLogout = connect(mapStateToProps)(Logout);
export { ConnectedLogout as Logout };
