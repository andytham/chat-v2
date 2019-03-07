import React from 'react';
import { Route } from 'react-router-dom';

//components
import { Home } from './Home';
import { Chatroom } from './Chatroom';
import { Login } from './Login';
import { Register } from './Register';

//css
import '../css/reset.scss'
import '../css/App.scss'
import '../css/Home.scss'
import '../css/Form.scss'
import '../css/Chatroom.scss'
import '../css/UsersList.scss'
import '../css/Night.scss'

class App extends React.Component {
	render(){
		return(
			<div id="auth" className="App">
				<Route exact path="/" render={() => <Home />} />
				<Route exact path="/login" render={() => <Login />} />
				<Route exact path="/register" render={() => <Register />} />
				<Route exact path="/chat" render={() => <Chatroom /> } />
			</div>
		)
	}
}

export default App;