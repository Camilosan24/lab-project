import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from '../components/login/index'
import {Container} from 'react-bootstrap'

class Routes extends React.Component {
	render() {
		return (
			<Container style={{margin: '0', padding: '0'}}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Login} />
					</Switch>
				</BrowserRouter>
			</Container>
		);
	}
}

export default Routes;
