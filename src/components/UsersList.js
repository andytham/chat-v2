import React from 'react';
import { connect } from 'react-redux';

class UsersList extends React.Component {
	constructor(props){
		super(props)
		
		this.mapUsers = this.mapUsers.bind(this)
	}
	mapUsers(){

	}
	render(){
		return(
			<div className="users-list">

			</div>
		)
	}
}


function mapStatetoProps(state) {
	const { usersList } = state.users
	return{
		usersList
	}
}

const ConnectedUsersList = connect (mapStatetoProps)(UsersList)
export { ConnectedUsersList as UsersList };