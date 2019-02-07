import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { connect } from 'react-redux';
import { userActions } from '../redux/actions';

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
			showPassword: false,
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
		console.log(this.props);
		const { username, password } = this.state;
		const { dispatch } = this.props;
		if (username && password) {
			dispatch(userActions.login(username, password));
		}
		//auth
	}
	render(){
		return(
			<div>
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


          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="form-password"
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
				<Button onClick={this.onSubmit}>
					Login
				</Button>
			</div>
		)
	}
}
function mapStateToProps(state) {
	const { loggingIn } = state.auth;
	return {
			loggingIn
	};
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login }; 
