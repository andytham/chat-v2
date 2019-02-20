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
			passwordConfirm: '',
			error: false
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
		if (this.state.username.length > 16){
			this.setState({
				error: true
			})
			let register = {message: "Username must be 16 characters long or shorter."}
			dispatch({type: userConstants.REGISTER_FAILURE, register})
		} else if (password != passwordConfirm){
			this.setState({
				error: true,
				password: "",
				passwordConfirm: ""
			})
			let register = {message: "Passwords do not match."}
			dispatch({type: userConstants.REGISTER_FAILURE, register})
		} else if (username && email && password && passwordConfirm == password) {
			let user = {
				username: username,
				email: email,
				password: password
			}
			dispatch(userActions.register(user))
		} else {
			this.setState({
				error: true,
				password: "",
				passwordConfirm: ""
			})
			let register = {message: "Registration field missing."}
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
						  error={this.state.error && (this.state.username == "" || this.state.username.length > 16)}
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
						  error={this.state.error && this.state.email == ""}
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
						  error={this.state.error && this.state.password == ""}
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
						  error={this.state.error && this.state.passwordConfirm == ""}
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