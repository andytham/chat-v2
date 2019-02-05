import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../css/App.css';

function jwtRequest(url, token){
	var req = new XMLHttpRequest();
	req.open('GET', url, true);
	req.setRequestHeader('Authorization', 'Bearer ' + token);
	req.send();
}
// let token = localStorage.getItem(token) || "dsgsdg";
let token = "344141"
jwtRequest("/fgdg", token); //can't be empty url? same with fetch

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
	componentDidMount(){

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