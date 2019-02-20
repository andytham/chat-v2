import React from 'react';
import { Route } from 'react-router-dom';
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

	render(){
		return(
			<div id="auth" className="App">
				<Route exact path="/" render={(props) => <Home />} />
				<Route exact path="/login" render={(props) => <Login /> } />
				<Route exact path="/chat" render={(props) => <Chatroom /> } />
				<Route exact path="/register" render={(props) => <Register />} />
				<Logout />
			</div>
		)
	}
}

export default App;