import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "../components/login/index";
import Home from "../components/home/index";
import NavLayout from "../components/nav/index";
import AddCustomer from '../components/customer/add/index'
import SearchCustomer from '../components/customer/search/index'
import { Container } from "react-bootstrap";

class Routes extends React.Component {
	render() {
		return (
			<Container fluid={true} className="p-0">
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Login} />
						<NavLayout>
							<Route exact path="/home" component={Home} />
							<Route exact path="/add" component={AddCustomer} />
							<Route exact path="/search" component={SearchCustomer} />
						</NavLayout>
					</Switch>
				</BrowserRouter>
			</Container>
		);
	}
}

export default Routes;
