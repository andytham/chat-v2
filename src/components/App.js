import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../css/App.css';

//components
import Home from './Home';
import Chatroom from './Chatroom';
import AuthComponent from './AuthComponent';
import lock from '../Auth/auth-config';




class App extends React.Component {
	componentDidMount(){
		let self = this
		lock.on("authenticated", function(authResult) {
			lock.getUserInfo(authResult.accessToken, function(error, profile) {
				if (error) {
					// Handle error
					return;
				}
				localStorage.setItem('accessToken', authResult.accessToken);
				localStorage.setItem('profile', JSON.stringify(profile));
				self.setState({
					username: profile.nickname
				});
			});
		});
		lock.on("authorization_error", function(authResult){
			self.setState({
				authed: false
			})
		})
	}

	render(){
		// function AuthChatroom ({component: Chatroom, authed, ...rest}){
		// 	return(
		// 		<Route
		// 			{...rest}
		// 			render={(props) => authed === true
		// 				? <Chatroom {...props} />
		// 				: <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
		// 		/>
		// 	)
		// }

		return(
			<div id="auth" className="App">
				<Route exact path="/" render={(props) => <Home />} />
				<Route exact path="/login" render={(props) => <AuthComponent /> } />
				<Route exact path="/chat" render={(props) => <Chatroom /> } />
				{/* <AuthChatroom authed={this.state.authed} path='/chat' component={Chatroom} /> */}
			</div>
		)
	}
}

export default App;