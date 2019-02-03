import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../css/App.css';

//components
import Home from './Home';
import Chatroom from './Chatroom';
import AuthComponent from './AuthComponent';
import lock from '../Auth/auth-config.js';
function AuthChatroom ({component: Chatroom, authed, ...rest}){
	console.log(authed);
	return(
		<Route
			{...rest}
			render={(props) => authed === true
				? <Chatroom {...props} />
				: <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
		/>
	)
}

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			isLoggedIn: false,
			username: ""
		}
	}
	componentDidMount(){
		let self = this
		lock.on("authenticated", function(authResult) {
			lock.getUserInfo(authResult.accessToken, function(error, profile) {
				if (error) {
					// Handle error
					return;
				}
				console.log("state update");
				self.setState({
					isLoggedIn: true,
					username: profile.nickname
				});
				this.toggleAuth();
				localStorage.setItem('accessToken', authResult.accessToken);
				localStorage.setItem('profile', JSON.stringify(profile));

			});

		});
		lock.on("authorization_error", function(authResult){
			console.log('auth error');
			self.setState({
				isLoggedIn: false
			})
		})
	}

	render(){
		return(
			<div id="auth" className="App">
				<Route exact path="/" render={(props) => <Home />} />
				<Route exact path="/login" render={(props) => <AuthComponent /> } />
				<Route exact path="/chat" render={(props) => <Chatroom username={this.state.username} isLoggedIn={this.state.isLoggedIn}/> } />
				{/* <AuthChatroom authed={this.state.authed} path='/chat' component={Chatroom} /> */}
			</div>
		)
	}
}

export default App;