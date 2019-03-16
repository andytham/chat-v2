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
				<div className="logo-wrapper"><img src={require("../images/lounge.png")} alt="lounge"/></div>
				<div>The Lounge, created by Andy Tham.</div>
				<div className="tagline">A place to chat and platform leisurely.</div>
				<div className="description">Features include real time chatroom and private messaging, user status system, and a mini-game platformer where everyone can climb together. Possible future features and such can be found on the GitHub.</div>
				<div className="tech-wrapper">
					<div className="tech-list">
						<div className="tech-header">Front-end:</div>
						<ul className="tech">
							<li>React</li>
							<li>Redux</li>
						</ul>
					</div>
					<div className="tech-list">
						<div className="tech-header">Styled with:</div>
						<ul className="tech">
							<li>Sass</li>
							<li>Material-UI</li>
						</ul>
					</div>
					<div className="tech-list">
						<div className="tech-header">Back-end:</div>
						<ul className="tech">
							<li>socket.io</li>
							<li>Express</li>
							<li>JWT</li>
							<li>bcrypt</li>
							<li>PostgreSQL</li>
						</ul>
					</div>
					<div className="tech-list">
						<div className="tech-header">Bundled with:</div>
						<ul className="tech">
							<li>webpack</li>
						</ul>
					</div>
				</div>

				<div className="demo-caption">Demo of "The Lounge" in action</div>
				<iframe className="demo" src="https://www.youtube.com/embed/7Jxw31Mw9FY" frameBorder="0"  allowFullScreen></iframe>
				<br />
				<br />
				<div className="description">Login or register to start. <br />(A real email address is currently not necessary)</div>
				<div className="buttons-wrapper home">
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