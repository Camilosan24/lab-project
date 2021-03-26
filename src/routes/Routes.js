import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "../components/login/index";
import Home from "../components/home/index";
import NavLayout from "../components/nav/index";
import AddCustomer from "../pages/addCustomer/index";
import SearchCustomer from "../pages/searchRecords/index";
import AddRecord from "../pages/records/add";
import List from "../pages/listCustomers/index";
import PdfGenerator from "../pages/pdfGenerator/index";
import { Container } from "react-bootstrap";

class Routes extends React.Component {
	render() {
		return (
			<Container fluid={true} className="p-0">
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/pdf" component={PdfGenerator} />
						<NavLayout>
							<Route exact path="/home" component={Home} />
							<Route exact path="/addclient" component={AddCustomer} />
							<Route exact path="/listclients" component={List} />
							<Route exact path="/searchrecord" component={SearchCustomer} />
							<Route exact path="/addrecord" component={AddRecord} />
						</NavLayout>
					</Switch>
				</BrowserRouter>
			</Container>
		);
	}
}

export default Routes;
