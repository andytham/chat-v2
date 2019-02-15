import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>Hello World
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
				<button onClick={()=>{console.log(this.state,this.props)}}>state and props</button>
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