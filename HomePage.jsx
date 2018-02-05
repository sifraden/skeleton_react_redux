import React 	from 'react';
import ReactDOM from 'react-dom';
import Request 	from 'superagent';
import _		from 'lodash';
import { Link } from 'react-router-dom';


class HomePage extends React.Component {
	   render() { 
	   		return (
	   			<div>
	   			<h1>Home Page </h1>
	   			<Link to="/login">Login</Link>
	   			<Link to="/map" style={{float: "right"}}>Map</Link>

	   			</div>
	   			);

	   }

}
export default HomePage;