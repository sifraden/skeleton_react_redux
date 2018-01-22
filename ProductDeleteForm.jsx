import React 	from 'react';
import ReactDOM from 'react-dom';
import Request 	from 'superagent';
import _		from 'lodash';
import { Link } from 'react-router-dom';
import { Form, Button, Label, Table, Input, Popup, Menu, Icon, Modal, Header, Confirm } from 'semantic-ui-react';

class ProductDeleteForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.setState({
			modalOpen: false,
		});
	};



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

   	handleOpen() {
		this.setState({ modalOpen: true });


	}

	handleClose() {
		this.setState({ modalOpen: false });
	}


	render(){

		return (

    				<Modal.Actions>
      				<Button basic color='red' inverted onClick={this.handleClose}>
        				<Icon name='remove' /> No
      				</Button>
      				<Button color='green' inverted onClick={this.deleteProduct.bind(this, this.props.id)}>
        				<Icon name='checkmark' /> Yes {this.props.id}
      				</Button>
    				</Modal.Actions>

		);
	}


}

export default ProductDeleteForm;