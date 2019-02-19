import React from 'react';
import { Route } from 'react-router-dom';
//components
import {Home} from './Home';
import {Chatroom} from './Chatroom';
import {Login} from './Login';
import Register from './Register';

import { Logout } from './Logout';

import '../css/App.scss'
import '../css/Chatroom.scss'

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
				<Route exact path="/chat" render={(props) => <Chatroom username={this.state.username} isLoggedIn={this.state.isLoggedIn}/> } />
				{/* <AuthChatroom authed={this.state.authed} path='/chat' component={Chatroom} /> */}
				<Route exact path="/register" render={(props) => <Register />} />
				<Logout />
			</div>
		)
	}
}

export default App;