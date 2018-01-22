import React from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import Validator from 'validator';
import HomeProduct from './HomeProduct.jsx';
import Request from 'superagent';
import { Route, Redirect } from 'react-router-dom';
import { combineActionsForLogin } from "./actions/combineActionForLogin.js";
import { connect } from "react-redux";





class LoginForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: {
				email : '',
				password : '',
				token: '',
			},
			auth: false,
			redirect: false,
			loading: false,
			token: '',
			admin: false,
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.validate = this.validate.bind(this);
		this.apiCall = this.apiCall.bind(this);
	};

	onChange(){
		this.setState({ data: { ...this.state.data, email:this.refs.email.value, password:this.refs.password.value}});
	}



	onSubmit(){
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(this.state.errors).length === 0){
			console.log(this.state.data);
			this.apiCall(this.state.data);
			console.log("AUTH " + this.state.auth);
			if (!this.state.auth) 
				this.setState({redirect: true});
			}
			this.props.combineActionsForLogin(this.state.data.email);
			this.isUserAdmin(this.state.data);



	}

	validate(data){
		const errors = {};
		if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
		if (!data.password) errors.password = "Password can't be blank" ;
		return errors;
	}

	apiCall(data){
		var url = `http://localhost:8080/api/skeleton/user/${data.email}/${data.password}`;
		Request.get(url).then((response) => {
		console.log("RESPONSE BODY " + response.text),
		localStorage.skeletonJWT = response.text;
		this.setState({
				auth: !!response.text,
				token: response.text
			});
		});

	}

	isUserAdmin(data){
		var url = `http://localhost:8080/api/skeleton/user/isAdmin/${data.email}/`;
		Request.get(url).then((response) => {
		console.log("RESPONSE BODY " + response.text),
		this.setState({
				admin: response.text
			});
		});
	}

	render() {

		const { data } = this.state;
		const redirection = this.state.auth;
		return (
			<Form onSubmit = {this.onSubmit}>
			<Form.Field error ={!!this.state.errors.email}>
			<label htmlFor = "email">Email</label>
			<input type = "email"
				   id = "email"
				   placeholder = "example@example.com"
				   ref = "email"
				   name = "email"
				   onChange = {this.onChange} />
			{this.state.errors.email && <span style = {{color: "#ae5856"}}>{this.state.errors.email} </span>}		    
			</Form.Field>
			<Form.Field error = {!!this.state.errors.password}>
			<label htmlFor = "password">Password</label>
			<input type = "password"
				   id = "password"
				   placeholder = "Make it secure"
				   ref = "password"
				   name = "password"
				   onChange = {this.onChange} />
			{this.state.errors.password && <span style = {{color: "#ae5856"}}>{this.state.errors.password} </span>}		    
 
			</Form.Field>
				<Button primary>Login</Button>
				{this.state.auth && <Redirect to={{
													pathname:'/homeProduct',
													state: {
														emailLogIn: this.props.emailLogIn,
														logIn: this.props.logIn,
														isAdmin: this.state.admin } }} /> }
				{this.state.redirect && <span style = {{color: "#ae5856"}}> Login/Password incorrect </span>}

			</Form>


			);
	}
}

	function mapStateToProps (state) {
			return {
				emailLogIn: state.loginReducer.email,
				logIn: state.loginReducer.loginIn

			};

		};

	function mapDispatchToProps(dispatch) {
			return {
				combineActionsForLogin: (email) => {
					dispatch(combineActionsForLogin(email));
				}
			};

		};

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);