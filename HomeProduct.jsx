import React 	from 'react';
import ReactDOM from 'react-dom';
import Request 	from 'superagent';
import _		from 'lodash';
import { Link } from 'react-router-dom';
import Validator from 'validator';
import { Form, Button, Label, Table, Input, Popup, Menu, Icon, Modal, Header, Confirm, Radio, Checkbox, Segment } from 'semantic-ui-react';
import ProductAddForm from './ProductAddForm.jsx';
import ProductUpdateForm from "./ProductUpdateForm.jsx";
import { popupManageOpen, popupManageClose } from "./actions/popupAction.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductDeleteForm from './ProductDeleteForm.jsx';


import Pagination from 'rc-pagination';





class HomeProduct extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			refreshHome: props.refresh,
			productId: '',
			name: "",
			popupEdit: false,
			email: "",
			isAuth: '',
			authority: '',
			value: '',
			checked: 'true',
			data: {
				id: '',
				email: '',
				login: '',
				password: '',
				authority: ''
			},
			errors: {},
			id: ''
		};
		this.searchProduct = this.searchProduct.bind(this);
		this.search = this.search.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handlePopupOpen = this.handlePopupOpen.bind(this);
		this.handlePopupClose = this.handlePopupClose.bind(this);
		this.addUserHandler = this.addUserHandler.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.apiCall = this.apiCall.bind(this);
		this.validate = this.validate.bind(this);
		this.setState({
			loading: false,
			productId: "",
			delete: false,
			modalOpen: false,
			popupOpen: false,
			modalOpenForUser: false,
			authority: '',
			refreshHome: props.refresh

		});

	};


	componentWillMount(){
		// Called the first time component is loaded right before the component added to the page
		this.search();

	}

	componentDidMount(){
		// Called after the component has been rendred into the page
		if (this.state.refreshHome){
			this.search();
		}
}

	componentWillReceiveProps(nextProps){
		// Called when the props provided to the component are changed
		if (nextProps){
			this.search();
		}

	}

	componentWillUpdate(nextProps, nextState){
		// Called when the nextProps and/or nextState change
		if (nextState.refreshHome){
			this.search();
			this.setState({refreshHome: false});
		}

	}

	componentWillUnmount(){
		// Called when the component is removed
		console.log("Wil unmount");

	}

	searchProduct(){
		this.setState({
			loading: true,
			popupAction: false
		});
   		this.search(this.refs.query.value);
   		this.setState({refresh: false});

   }

    search(query = "") {
   		if (query == ""){
   			var url = "http://localhost:8080/api/skeleton/product/all";
			Request.get(url).then((response) => {
			this.setState({
				loading: false,
				modalOpen: false,
				popupOpen: false,
				products : response.body,
				total : response.body.totalResults
				});
			});
   		} else {
   			var url = `http://localhost:8080/api/skeleton/products/${query}`;
			Request.get(url).then((response) => {
			this.setState({
				loading: false,
				modalOpen: false,
				popupOpen: false,
				products : response.body,
				total : response.body.totalResults
				});
			});
   		}

   	}

   	deleteProduct(id){
   		console.log("DELETE ID " + id);
   		 var url = `http://localhost:8080/api/skeleton/product/delete/${id}`;
   		 Request.del(url).then((response) => {
   		 	this.setState({
   		 		delete: true,
   		 		modalOpen: false,
   		 		refreshHome: true
   		 		});
   		 	});

   	}

   	handleOpen(id, name) {
   		console.log(id);
   		this.setState({productId: id,
   						name: name});
		this.setState({ modalOpen: true });


	}

	handleOpenModal(){
		this.setState({modalOpenForUser: true});
	}
	handleCloseModal(){
		this.setState({modalOpenForUser: false});
	}

	handleClose() {
		this.setState({ modalOpen: false });
	}

	handlePopupOpen(){
		this.setState({
			popUpAction: true,
			popUpEdit: this.props.popUpActionEdit
		});

		console.log("popupEdit " + this.state.popUpEdit);
	}

	handlePopupClose(){
		this.setState({
			popupOpen: false
		});
	}

	handleChange(){
		//this.setState({authority: 'ADMIN' })
		this.setState({checked: !this.state.checked});
		if (this.state.checked = 'true')
			this.setState({authority: "ADMIN"});
		if (this.state.checked = 'false')
			this.setState({authority: "SIMPLE"});

	}

	onChange(){

		this.setState({data: { ...this.state.data, id: this.refs.id.value, email: this.refs.email.value, login: this.refs.login.value, password: this.refs.password.value}});

	}

	validate(data){
		const errors = {};
		if (!data.id) errors.id = "ID can't be blank";
		if (!data.login) errors.login = "Login can't be blank";
		if (!data.email) errors.email = "Invalid Email";
		if (!data.password) errors.password = "Password can't be blank" ;

		return errors;
	}

	addUserHandler(){
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(this.state.errors).length === 0){
			//console.log(this.state.data);
			//this.apiCall(this.state.data);
			this.setState({ modalOpen: false });
			console.log(this.state.checked);
			if (this.state.checked = true)
				this.setState({authority: "ADMIN"});
			if (this.state.checked = false)
				this.setState({authority: "SIMPLE"});
			this.setState({data: { ...this.state.data, authority: this.state.authority}})
			console.log(this.state.data);


		}

	}

	apiCall(data){
		var url = "http://localhost:8080/api/skeleton/user/add";
		Request.post(url)
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.send(data)
		.then((response) => {
		});

	}



	   render() { 

	   	   	    var products = _.map(this.state.products, (product) => {
      	 			return <Table.Row>
        			<Table.Cell>{product.id}</Table.Cell>
        		<Table.Cell>{product.name}</Table.Cell>
        		<Table.Cell>{product.description}</Table.Cell>
        		<Table.Cell>{product.price}</Table.Cell>
        		<Table.Cell><Popup
            		trigger={<Button content='Edit product' color='green' />}
            		content={<ProductUpdateForm id={product.id}/>}
            		on='click'
            		position='top right large'
            		size = 'large'
            		onClose = {this.searchProduct}
          		/>
         		<Modal trigger={<Button color='red' onClick={this.handleOpen.bind(this, product.id, product.name)}>Delete</Button>} 
          				basic 
          				size='small'
          				open={this.state.modalOpen}>
    				<Header icon='delete' content='Delete Product' />
   					 <Modal.Content>
     					<p>Are you sure to delete this product {this.state.name}?</p>
  				</Modal.Content>
   				<Modal.Actions>
      				<Button basic color='red' inverted onClick={this.handleClose}>
        				<Icon name='remove' /> No
      				</Button>
      				<Button color='green' inverted onClick={this.deleteProduct.bind(this, this.state.productId)}>
        				<Icon name='checkmark' /> Yes {this.state.productId}
      				</Button>
    				</Modal.Actions>
  				</Modal>
  				</Table.Cell>

      			</Table.Row>


      	 });	
	   		return (

	   			<div>
	   			<h1>Product Store</h1>
	   			{ (this.props.location.state.logIn) && <button style = {{color: "#be5856", float: "right"}}>Log out</button> }

	   			<h3>Manage the product </h3>
	   			{ (!!this.props.location.state.emailLogIn) && <span style = {{color: "#be5856", float: "right"}}>Welcome {this.props.location.state.emailLogIn}</span> }

	   			{this.props.location.state.isAdmin == 'true' &&  <Modal trigger={<Button icon inverted color='red' onClick={this.handleOpenModal} >Add User</Button>} 
          				basic 
          				size='small'
          				open={this.state.modalOpenForUser}>
    				<Header icon='add' content='Add User' />
   					 <Modal.Content>
     					<Form>
     						<Form.Field>
     							<input type="text" ref="id" placeholder="ID" onChange = {this.onChange} />
     							{this.state.errors.id && <span style = {{color: "#ae5856"}}>{this.state.errors.id} </span>}					
     							<input type="email" ref="email" placeholder="Email" onChange={this.onChange} />
     							{this.state.errors.email && <span style = {{color: "#ae5856"}}>{this.state.errors.email} </span>}		
     							<input type="text" ref="login" placeholder="Login" onChange={this.onChange} />
     							{this.state.errors.login && <span style = {{color: "#ae5856"}}>{this.state.errors.login} </span>}		
     							<input type="password" ref="password" placeholder="Password" onChange={this.onChange} />
     							{this.state.errors.password && <span style = {{color: "#ae5856"}}>{this.state.errors.password} </span>}		


          						<Segment color='olive' inverted>
          								<span color='black'>ADMIN  </span>
      									<Checkbox
      									toggle
      									ref="role"
      									checked={this.state.checked}
      									onClick={this.handleChange}
      									style={{float: "right"}} />
    							</Segment>
     						</Form.Field>
     					</Form>
  					</Modal.Content>
   					<Modal.Actions>
      				<Button basic color='red' inverted onClick={this.handleCloseModal}>
        				<Icon name='remove' /> No
      				</Button>
      				<Button color='green' inverted onClick={this.addUserHandler}>
        				<Icon name='checkmark' /> Yes
      				</Button>
    				</Modal.Actions>
  				</Modal>}
          		<Popup
            		trigger={<Button content='Add new product' icon onClick={() => this.props.popupManageOpen()} />}
            		content={<ProductAddForm />}
            		on='click'
            		open={this.props.popUpAction}
            		position='top right large'
            		size = 'large'
            		onClose = {this.searchProduct}
          		/>
	   			<Form loading={this.state.loading}>
	   			<Form.Field>
	   			<label htmlFor="Search">Search</label>
         		<input 	icon='search' 
         				type = "text"
               			onChange = {this.searchProduct} 
               			ref="query" />
	   			</Form.Field>
	   			<Table singleLine sortable as = "table">
	   			<Table.Header>
      			<Table.Row>
        		<Table.HeaderCell>ID</Table.HeaderCell>
        		<Table.HeaderCell>Name</Table.HeaderCell>
        		<Table.HeaderCell>Description</Table.HeaderCell>
        		<Table.HeaderCell>Price</Table.HeaderCell>
        		<Table.HeaderCell></Table.HeaderCell>
      			</Table.Row>
    			</Table.Header> 
    			{products}
	   			</Table>

	   			</Form>
	   			</div>
	   			);

	   }

}


		function mapStateToProps (state) {
			return {
				popUpAction: state.popupReducer.popupHold,
				refresh: state.refreshReducer.refresh,
				popUpActionEdit: state.popupReducer.popupHoldEdit
			};

		};

		function mapDispatchToProps(dispatch) {
			return {
				popupManageOpen: () => {
				dispatch(popupManageOpen());
				}
			};

		};

export default connect(mapStateToProps, mapDispatchToProps)(HomeProduct);