import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>Hello World</div>
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