import React 	from 'react';
import ReactDOM from 'react-dom';
import Request 	from 'superagent';
import _		from 'lodash';
import { Link } from 'react-router-dom';
import { Form, Button, Label, Table, Input, Popup, Transition } from 'semantic-ui-react';
import LoginForm from './LoginForm.jsx';
import HomeProduct from './HomeProduct.jsx';
import Validator from 'validator';
import { Route, Redirect } from 'react-router-dom';
import { popupManageOpen, popupManageClose } from "./actions/popupAction.js";
import { combineActions } from "./actions/combineActions.js";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';





class ProductAddForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data: {
				id: '',
				name: '',
				descritpion: '',
				price: ''
			},
			redirect: 'false',
			popup: false,
			popUpAction: 'false',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.validate = this.validate.bind(this);
		this.apiCall = this.apiCall.bind(this);

	};

	componentWillReceiveProps(nextProps){
		// Called when the props provided to the component are changed
		if (true === nextProps.redirect){
			<Redirect to='/homeProduct' />
		}
	}

	onChange(){
		this.setState({ data: { ...this.state.data, id: this.refs.id.value, name: this.refs.name.value, description: this.refs.description.value, price: this.refs.price.value}})
	}


	validate(data){
		const errors = {};
		if (!data.id) errors.id = "ID can't be blank";
		if (!data.name) errors.name = "Name can't be blank" ;
		if (!data.description) errors.description = "Description can't be blank" ;
		if (!data.price) errors.price = "Price can't be blank" ;

		return errors;
	}

	onSubmit(){
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(this.state.errors).length === 0){
			console.log(this.state.data);
			this.apiCall(this.state.data);
			this.setState({popup: true});
			this.props.combineActions();

		}

	}

	apiCall(data){
		var url = "http://localhost:8080/api/skeleton/product/add";
		Request.post(url)
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.send(data)
		.then((response) => {
		this.setState({redirect: 'true'})
		});

	}



	render(){


		return (
			<Form onSubmit = {this.onSubmit} >
			<Form.Field>
			<label htmlFor = "id">ID:</label>
			<input  type = "text"
					ref = "id"
					onChange = {this.onChange} />
			{this.state.errors.id && <span style = {{color: "#ae5856"}}>{this.state.errors.id} </span>}		
			<label htmlFor = "name">Name:</label>
			<input  type = "text"
					ref = "name"
					onChange = {this.onChange} />
			{this.state.errors.name && <span style = {{color: "#ae5856"}}>{this.state.errors.name} </span>}		
			<label htmlFor = "description">Description:</label>
			<input  type = "text"
					ref = "description"
					onChange = {this.onChange} />
			{this.state.errors.description && <span style = {{color: "#ae5856"}}>{this.state.errors.description} </span>}		
			<label htmlFor = "price">Price:</label>
			<input  type = "text"
					ref = "price"
					onChange = {this.onChange} />
			{this.state.errors.price && <span style = {{color: "#ae5856"}}>{this.state.errors.price} </span>}		
			</Form.Field>

			 <Button primary transition='slide' >Add Product</Button>
			</Form>


			);

	}

}

		function mapStateToProps(state) {
			return {
				popUpAction: state.popupHold
			};

		};

		function mapDispatchToProps(dispatch) {
			return {
				combineActions: () => {
				dispatch(combineActions());
				}
			};

		};


export default connect(mapStateToProps,mapDispatchToProps)(ProductAddForm);