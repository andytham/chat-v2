import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

class Home extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className="home">
				This is the Lounge.
				Created using:
				React
				Redux
				JWT
				socket.io
				Sass
				Express
				<div className="buttons-wrapper">
					<Button className="button button-1" href='/login'>
						Login
					</Button>
					<Button className="button button-2" href='/register'>
						Register
					</Button>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	const { user } = state.auth;
	return {
		user
	}
}

const ConnectedHome = connect(mapStateToProps)(Home);
export { ConnectedHome as Home };