import React from "react";
import { Navbar, Row, Nav, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

class NavLayout extends React.Component {
	logOut = () => {
		axios.get("/api/user/logout").then((res) => {
			console.log(res);
			this.props.history.push("/");
		});
	};
	render() {
		return (
			<>
				<Row className="d-block">
					<Col className="p-0">
						<Navbar bg="dark" variant="dark" className="p-4">
							<Link to="/home" className="navbar navbar-brand">
								Lab Clinico M.G.L.
							</Link>
							<Nav className="ml-auto">
								<Dropdown className="mr-5">
									<Dropdown.Toggle variant="dark" id="dropdown-basic">
										Clientes
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Link className="mr-5 dropdown-item" to="/add">
											Añadir nuevo
										</Link>
										<Link className="mr-5 dropdown-item" to="/list">
											Listar todos
										</Link>
									</Dropdown.Menu>
								</Dropdown>

								<Dropdown className="mr-5">
									<Dropdown.Toggle variant="dark" id="dropdown-basic">
										Registros
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Link className="mr-5 dropdown-item" to="/search">
											Buscar
										</Link>
										<Link className="mr-5 dropdown-item" to="/addRecord">
											Añadir nuevo
										</Link>
									</Dropdown.Menu>
								</Dropdown>
								<li className="nav-item">
									<Link className="mr-5 nav-link " to="/" onClick={this.logOut}>
										<span className="mr-2 coloresAdentro"> Salir</span>
										<i class="fas fa-sign-out-alt"></i>
									</Link>
								</li>
							</Nav>
						</Navbar>
					</Col>
				</Row>
				<Row className="backgroundSpace">{this.props.children}</Row>
			</>
		);
	}
}

export default NavLayout;
