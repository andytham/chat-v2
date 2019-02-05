import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../css/App.css';

// function jwtRequest(url, token){
// 	var req = new XMLHttpRequest();
// 	req.open('GET', url, true);
// 	req.setRequestHeader('Authorization', 'Bearer ' + token);
// 	req.send();
// }
// let test = JSON.parse(localStorage.getItem("user"))
// if (!test){ test = ""}
// let token = test.token || "No token";
// jwtRequest("/fgdg", token); //can't be empty url? same with fetch

// import axios from 'axios';
// let test = JSON.parse(localStorage.getItem("user"))
// if (!test){ test = ""}
// let token = test.token || "No token";
// axios.defaults.baseURL = 'http://localhost8080';
// axios.defaults.headers.common['Authorization'] = token;

// fetch('/login', {
// 	method: "get",
// 	headers: new Headers({
// 		'Authorization': 'Bearer ' + token
// 	})
// })


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