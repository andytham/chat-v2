import React from 'react';
import '../css/App.css';
import Chatroom from './Chatroom';

class App extends React.Component {
	render(){
		return(
			<div className="App">
				Hello World
				<Chatroom />
			</div>
		)
	}
}

export default App;