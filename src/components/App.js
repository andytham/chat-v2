import React from 'react';
import { Route } from 'react-router-dom';
import '../css/App.css';
//components
import {Home} from './Home';
import Chatroom from './Chatroom';
import {Login} from './Login';
import { Logout } from './Logout';
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
				<Logout />
			</div>
		)
	}
}

export default App;