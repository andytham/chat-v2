import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../css/App.css';

//components
import Home from './Home';
import Chatroom from './Chatroom';
import AuthComponent from './AuthComponent';


class App extends React.Component {
	render(){
		return(
			<div id="auth" className="App">
				<Route exact path="/" render={(props) => <Home />} />
				<Route exact path="/login" render={(props) => <AuthComponent /> } />
				<Route exact path="/chat" render={(props) => <Chatroom /> } />
			</div>
		)
	}
}

export default App;