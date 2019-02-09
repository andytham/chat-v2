import React from 'react';
import { connect } from 'react-redux';
import { sessionsActions } from '../redux/actions';

class UsersList extends React.Component {
	constructor(props){
		super(props)
		
		this.mapUsers = this.mapUsers.bind(this)
	}
	componentDidMount(){
		const { dispatch } = this.props;
		if(this.props.username){
			let timestamp = new Date();
			let data = {
				username: this.props.username,
				lastOnline: timestamp.toLocaleDateString() + timestamp.toLocaleTimeString(),
				currentStatus: "online"
			}
			dispatch(sessionsActions.populateSessions())
			dispatch(sessionsActions.updateSession(data))
		}
	}
	mapUsers(){
		console.log('props from userslist');
		console.log(this.props);
	}
	render(){
		return(
			<div className="users-list">
				<button onClick={this.mapUsers}>users list</button>
			</div>
		)
	}
}


function mapStatetoProps(state) {
	const { sessions } = state.sessions
	return{
		sessions
	}
}

const ConnectedUsersList = connect (mapStatetoProps)(UsersList)
export { ConnectedUsersList as UsersList };