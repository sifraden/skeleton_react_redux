import React 	from 'react';
import ReactDOM from 'react-dom';
import Request 	from 'superagent';
import _		from 'lodash';
import { Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import HomeProduct from './HomeProduct.jsx';
import MapContainer from './MapContainer.js';



class App extends React.Component {
	   render() { 
	   		return (
	   			<div className = "ui container">
	   			<Route path = "/" exact component = {HomePage} />
	   		    <Route path = "/login" exact component = {LoginPage} />
	   		    <Route path = "/homeProduct" exact component = {HomeProduct} />
	   		   	<Route path = "/map" exact component = {MapContainer} />


	   			</div>
	   			);

	   }

}
export default App;