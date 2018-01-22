import React 	from 'react';
import ReactDOM from 'react-dom';
import Request 	from 'superagent';
import _		from 'lodash';
import { Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import HomeProduct from './HomeProduct.jsx';



class App extends React.Component {
	   render() { 
	   		return (
	   			<div className = "ui container">
	   			<Route path = "/" exact component = {HomePage} />
	   		    <Route path = "/login" exact component = {LoginPage} />
	   		    <Route path = "/homeProduct" exact component = {HomeProduct} />

	   			</div>
	   			);

	   }

}
export default App;