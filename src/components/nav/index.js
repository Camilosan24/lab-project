import React from "react";
import { Navbar, Row, Nav, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavLayout extends React.Component {
	render() {
		return (
			<>
				<Row className="d-block">
					<Col className="p-0">
						<Navbar bg="dark" variant="dark" className="p-4">
							<Link to="/home" className="navbar navbar-brand">
								Laboratorios Marisol
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
										<Link className="mr-5 dropdown-item" to="/addRegister">
											Añadir nuevo
										</Link>
									</Dropdown.Menu>
								</Dropdown>
								<Nav.Link className="mr-5" href="/contact">
									Contacto
								</Nav.Link>
							</Nav>
						</Navbar>
					</Col>
				</Row>
				<Row>{this.props.children}</Row>
			</>
		);
	}
}

export default NavLayout;
