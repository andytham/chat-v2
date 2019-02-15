import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import { registerService } from '../redux/services';
class Register extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordRepeat: ''
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
		const { username, email, password, passwordRepeat } = this.state;
		const { dispatch } = this.props;
		if (username && email && password && passwordRepeat == password) {
			let user = {
				username: username,
				email: email,
				password: password
			}
			registerService.register(user)
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
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="form-password"
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
					<InputLabel htmlFor="password-repeat">Confirm Password</InputLabel>
					<Input
							id="form-password-repeat"
							type='password'
							value={this.state.passwordRepeat}
							onChange={(event) => this.handleChange('passwordRepeat', event)}
							onKeyPress={e => (e.key === 'Enter' ? this.onSubmit(e) : null)}
						/>
				</FormControl>
				<Button onClick={this.onSubmit}>
					Register
				</Button>
				<Link to='/login'>
					Back
				</Link>
			</div>
		)
	}
}

export default Register;