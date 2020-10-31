import React from 'react';
import TokenService from '../../../services/TokenService';
import AuthHelperService from '../../../services/AuthHelperService';
import {GeneralApiServices} from '../../../services/api-service'
import '../form-style.css'

export default class LoginForm extends React.Component {
	static defaultProps = {
		onLoginSuccess: () => {}
	};

	state = {
		userList: [],
		error: null,
		displayForm: 1,
		usernamMessage: '',
		passwordMessage: ''
    };
    
    componentDidMount(){
        GeneralApiServices.getAllItems('users').then(json=>{
            this.setState({userList:json})
        })
    }

	handleSubmitJwtAuth = (ev) => {
		ev.preventDefault();
		this.setState({ error: null });
		const { user_name, password } = ev.target;
		const login = {
			user_name: user_name.value,
			password: password.value
		};

		AuthHelperService.postLogin(JSON.stringify(login))
			.then((res) => {
				TokenService.saveAuthToken(res.authToken);
				user_name.value = '';
				password.value = '';
				this.props.onLoginSuccess();
				this.props.history.goBack();
			})
			.catch((res) => {
				this.setState({ error: res.message });
			});
	};

	handleLoginReady = () => this.setState({ displayForm: 1, usernameMessage: '', passwordMessage: '' });
	handleForgotUsernameClicked = () => this.setState({ displayForm: 2 });
	handleForgotPasswordClicked = () => this.setState({ displayForm: 3 });

	handleForgotUsernameSubmitted = (e) => {
		e.preventDefault();
		const { full_name, age } = e.target;
		const full = full_name.value.toLowerCase();
		const user = this.state.userList.find((u) => {
			const full_name = u.full_name.toLowerCase();
			return full_name === full && Number(u.age) === Number(age.value);
		});
		const message = user
			? `Hooray, we found you. Your username is ${user.user_name}`
			: `Sorry, we cound not find your information. Please try it again!`;
		this.setState({ usernameMessage: message });
	};
	handleForgotPasswordSubmitted = (e) => {
		e.preventDefault();
		this.setState({ passwordMessage: `Your password has been reset and sent to your email on file.` });
	};
	renderForgotUserNameForm() {
		const message = this.state.usernameMessage ? <div className="message">{this.state.usernameMessage}</div> : '';
		return (
			<form className="retrieve-info" onSubmit={this.handleForgotUsernameSubmitted}>
				<h2>Let's help find your username</h2>
				<div>
					<header>Full name:</header>
					<input type="text" name="full_name" />
					<header>Age:</header>
					<input type="number" name="age" />
				</div>
				{message}
				<div className="form_control">
					<button type="button" onClick={this.handleLoginReady}>
						Go back
					</button>
					<button type="submit">Find me</button>
				</div>
			</form>
		);
	}
	renderForgotPasswordForm() {
		const { passwordMessage } = this.state;
		//const boolean= (passwordMessage)? true: false
		const message = passwordMessage ? <div className="message">{passwordMessage}</div> : '';
		return (
			<form className="retrieve-info" onSubmit={this.handleForgotPasswordSubmitted} >
				<h2>Reset your password</h2>
				<div>
					<header>Enter your username/email:</header>
					<input type="text" name="username" />
				</div>
				{message}
				<div className="form_control">
					<button type="button" onClick={this.handleLoginReady}>
						Go back
					</button>
					<button type="submit" disabled={passwordMessage}>
						Reset password
					</button>
				</div>
			</form>
		);
	}
	renderLoginForm() {
		return (
			<form className="form Login-form" onSubmit={this.handleSubmitJwtAuth}>
				<h1>Login</h1>
				<div>
					<input required type="text" name="user_name" id="user_name" placeholder="User name" />
					<input required type="password" name="password" id="password" placeholder="password" autoComplete="off"/>
				</div>
				
				<div className="displayPassword">
					<div className='checkedInput'>
						<input type="checkbox" id="togglePassword" 
							onClick={() => {
								const password = document.getElementById('password');
								if (password.type === 'password') password.type = 'text';
								else password.type = 'password';
							}}
						/>
					</div>
					
					<label htmlFor="togglePassword">show password</label>
				</div>
				<div className="form_help">
					<div onClick={this.handleForgotUsernameClicked}>Forgot username</div>
					<div onClick={this.handleForgotPasswordClicked}>Forgot password</div>
				</div>
				<div className="form_control">
					<button type="submit">Login</button>
				</div>
				
			</form>
		);
	}
	// 
	render() {
		const { error, displayForm } = this.state;
		const form =
			displayForm === 1
				? this.renderLoginForm()
				: displayForm === 2
					? this.renderForgotUserNameForm()
					: displayForm === 3 ? this.renderForgotPasswordForm() : '';
		return (
			<div id="help-me-login">
				{form}
				{error && <p>{error}</p>}
			</div>
		);
	}
}
