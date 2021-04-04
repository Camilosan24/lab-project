import React from "react";
import {
	Navbar,
	Nav,
	Row,
	Col,
	NavDropdown,
	NavLink,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Carousel from "../carousel/index";
import axios from "axios";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";

class NavLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			logoAnimation: false,
		};
	}
	logOut = () => {
		axios.get("/api/user/logout").then((res) => {
			console.log(res)
			return <Redirect to="/"/>
		});
	};
	render() {
		return (
			<>
				<Navbar
					collapseOnSelect
					expand="lg"
					bg="dark"
					variant="dark"
					className="p-4"
				>
					<Col>
						<Row>
							<Col xs={9} md={4}>
								<Row xs={12}>
									<Col sm={{ span: 12 }} className="pl-0">
										<LinkContainer to="/home" className="m-0">
											<Navbar.Brand
												onMouseEnter={() => {
													this.setState({ logoAnimation: true });
												}}
												onMouseLeave={() => {
													this.setState({ logoAnimation: false });
												}}
											>
												Lab Clinico M.G.L.
											</Navbar.Brand>
										</LinkContainer>
										<i
											className={`fas fa-vial text-light ${
												this.state.logoAnimation ? "logo-animation" : null
											}`}
										></i>
									</Col>
								</Row>
							</Col>
							<Col xs={3} md={0}>
								<Navbar.Toggle
									aria-controls="responsive-navbar-nav"
									id="burger-toggle"
								/>
							</Col>
							<Col md={{ span: 4, offset: 1 }}>
								<Navbar.Collapse id="responsive-navbar-nav">
									<hr/>
									<Nav className="m-auto">
										<NavDropdown title="Clientes" id="collasible-nav-dropdown" className="pr-3">
											<LinkContainer to="/addcustomer" >
												<NavDropdown.Item className="pr-2">Añadir Nuevo</NavDropdown.Item>
											</LinkContainer>
											<LinkContainer to="/listcustomers">
												<NavDropdown.Item>Listar Todos</NavDropdown.Item>
											</LinkContainer>
										</NavDropdown>

										<NavDropdown title="Registros" id="collasible-nav-dropdown" className="pr-3">
											<LinkContainer to="/addrecord">
												<NavDropdown.Item>Añadir Nuevo</NavDropdown.Item>
											</LinkContainer>
											<LinkContainer to="/searchrecord">
												<NavDropdown.Item>Buscar</NavDropdown.Item>
											</LinkContainer>
										</NavDropdown>
										<hr />
										<Col className="p-0">
											<LinkContainer to="" onClick={this.logOut}>
												<NavLink>
													Salir<i className="fas fa-sign-out-alt pl-2"></i>
												</NavLink>
											</LinkContainer>
										</Col>
									</Nav>
								</Navbar.Collapse>
							</Col>
						</Row>
					</Col>
				</Navbar>

				<Row className="backgroundSpace" style={{ margin: 0 }}>
					<Carousel />
					<Col md={{ span: 12 }} className="childrens-space mt-1 p-0">
						{this.props.children}
					</Col>
				</Row>
			</>
		);
	}
}

export default NavLayout;
