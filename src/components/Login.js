import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { connect } from 'react-redux';
import { userActions } from '../actions';
import { userConstants } from '../constants';
import { SystemMsg } from './SystemMsg';

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
			showPassword: false,
			error: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount(){

	}
	handleChange(prop, event){
		this.setState({ [prop]: event.target.value });
	}

  handleClickShowPassword(){
    this.setState(state => ({ showPassword: !state.showPassword }));
	};

	onSubmit(e){
		e.preventDefault();
		const { username, password } = this.state;
		const { dispatch } = this.props;
		this.setState({
			password: ""
		})
		if (username && password) {
			dispatch(userActions.login(username, password));
		} else if (!username){
			let register = ["Please enter a username."]
			this.setState({
				error: true
			})
			dispatch({type: userConstants.REGISTER_FAILURE, register})
		}else if (!password){
			let register = ["Please enter a password."]
			this.setState({
				error: true
			})
			dispatch({type: userConstants.REGISTER_FAILURE, register})
		}
	}

	render(){
		return(
			<div className="form-wrapper">
				<div className="login-header">
					Please login to access the chatroom.
				</div>
				<div className="login">
					<FormControl className="form">
						<InputLabel htmlFor="username">Username</InputLabel>
						<Input
							id="form-username"
							error={this.state.error && this.state.username == ""}
							autoFocus={true}
							value={this.state.username}
							onChange={e => this.handleChange('username', e)}
							onKeyPress={e => (e.key === 'Enter' ? this.onSubmit(e) : null)}
						/>
					</FormControl>
					<FormControl className="form">
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							id="form-password"
							error={this.state.error && this.state.password == ""}
							type={this.state.showPassword ? 'text' : 'password'}
							value={this.state.password}
							onChange={(event) => this.handleChange('password', event)}
							onKeyPress={e => (e.key === 'Enter' ? this.onSubmit(e) : null)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="Toggle password visibility"
										onClick={this.handleClickShowPassword}
									>
										{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<div className="buttons-wrapper">
						<Button className="button button-1" onClick={this.onSubmit}>
							Login
						</Button>
						<Button className="button button-2" href='/register'>
							Register
						</Button>
					</div>
				</div>
				{this.props.systemMsg ? <SystemMsg />: ""}
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { loggingIn, systemMsg, isLoggedIn } = state.auth;
	return {
			loggingIn, systemMsg, isLoggedIn
	};
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login }; 
