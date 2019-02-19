import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { userActions } from '../redux/actions';
import { userConstants } from '../redux/constants';
import { connect } from 'react-redux';
import { SystemMsg } from './SystemMsg';
class Register extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirm: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	handleChange(prop, event){
		this.setState({ [prop]: event.target.value });
	}

	onSubmit(e){
		e.preventDefault();
		console.log(this.props);
		const { username, email, password, passwordConfirm } = this.state;
		const { dispatch } = this.props;
		if (username && email && password && passwordConfirm == password) {
			console.log("check");
			let user = {
				username: username,
				email: email,
				password: password
			}
			dispatch(userActions.register(user))
			console.log("after check");
		} else if (password != passwordConfirm){
			let register = {message: "Passwords do not match."}
			dispatch({type: userConstants.REGISTER_FAILURE, register})
		}
		//auth
	}
	render(){
		return(
			<div className="form-wrapper">
				<div className="register">
					<FormControl className="form">
						<InputLabel htmlFor="username">Username</InputLabel>
						<Input
							id="form-username"
							autoFocus={true}
							value={this.state.username}
							onChange={e => this.handleChange('username', e)}
							onKeyPress={e => (e.key === 'Enter' ? this.onSubmit(e) : null)}
						/>
					</FormControl>
					<FormControl className="form">
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input
							id="form-email"
							type='text'
							value={this.state.email}
							onChange={(event) => this.handleChange('email', event)}
							onKeyPress={e => (e.key === 'Enter' ? this.onSubmit(e) : null)}
						/>
						
					</FormControl>
					<FormControl className="form">
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							id="form-password"
							type='password'
							value={this.state.password}
							onChange={(event) => this.handleChange('password', event)}
							onKeyPress={e => (e.key === 'Enter' ? this.onSubmit(e) : null)}
						/>
						
					</FormControl>
					<FormControl className="form">
						<InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
						<Input
								id="form-password-confirm"
								type='password'
								value={this.state.passwordConfirm}
								onChange={(event) => this.handleChange('passwordConfirm', event)}
								onKeyPress={e => (e.key === 'Enter' ? this.onSubmit(e) : null)}
							/>
					</FormControl>
					<div className="buttons-wrapper">				
						<Button className="button button-1" onClick={this.onSubmit}>
							Register
						</Button>
						<Button className="button button-2" href='/login'>
							Back
						</Button>
					</div>
				</div>
				{this.props.systemMsg ? <SystemMsg /> : ""}
			</div>
		)
	}
}
function mapStateToProps(state){
	const { isLoggedIn, systemMsg } = state.auth;
	return {
		isLoggedIn,
		systemMsg
	}
}


const ConnectedRegister = connect(mapStateToProps)(Register)
export { ConnectedRegister as Register };