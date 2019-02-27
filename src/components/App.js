import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//components
import { Home } from './Home';
import { Chatroom } from './Chatroom';
import { Login } from './Login';
import { Logout } from './Logout';
import { Register } from './Register';
//css
import '../css/reset.scss'
import '../css/App.scss'
import '../css/Form.scss'
import '../css/Chatroom.scss'
import '../css/UsersList.scss'
class App extends React.Component {
	constructor(){
		super();
		this.state = {
			isLoggedIn: false,
			username: ""
		}
	}
	componentDidMount(){
		console.log(this.props);
	}
	render(){
		return(
			<div id="auth" className="App">
				<Route exact path="/" render={(props) => <Home />} />
				<Route exact path="/login" render={(props) => (
					this.props.isLoggedIn ? 
					(<Login />) :
					(<Redirect to="/chat" />)
				)} />
				<Route exact path="/register" render={(props) => (
					this.props.isLoggedIn ? 
					(<Register />) :
					(<Redirect to="/chat" />)
				)} />
				<Route exact path="/chat" render={(props) => <Chatroom /> } />
				<Logout />
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { isLoggedIn } = state.auth;
	return {
		isLoggedIn
	};
}

const ConnectedApp = withRouter(connect(mapStateToProps)(App))
export { ConnectedApp as App };