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

	render(){
		return(
			<div id="auth" className="App">
				<Route exact path="/" render={(props) => <Home />} />
				<Route exact path="/login" render={(props) => <Login />} />
				<Route exact path="/register" render={(props) => <Register />} />
				<Route exact path="/chat" render={(props) => <Chatroom /> } />
				{/* <Logout /> */}
			</div>
		)
	}
}

export default App;