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
	   			</div>
	   			);

	   }

}
export default HomePage;