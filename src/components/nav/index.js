import React from "react";
import { Navbar, Row, Nav, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "../carousel/index";
import axios from "axios";
import "./styles.css";

class NavLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			logoAnimation: false,
		};
	}
	logOut = () => {
		axios.get("/api/user/logout").then((res) => {
			console.log(res);
			this.props.history.push("/");
		});
	};
	render() {
		return (
			<div className="main-layout">
				<Row className="d-block">
					<Col className="p-0">
						<Navbar bg="dark" variant="dark" className="p-4">
							<Link
								to="/home"
								className="navbar navbar-brand"
								onMouseEnter={() => {
									this.setState({ logoAnimation: true });
								}}
								onMouseLeave={() => {
									this.setState({ logoAnimation: false });
								}}
							>
								Lab Clinico M.G.L.
								<i
									class={`fas fa-vial ${
										this.state.logoAnimation ? "logo-animation" : null
									}`}
								></i>
								{/* </div> */}
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
				<Row className="backgroundSpace" style={{ margin: 0 }}>
					<Carousel />
					<Col md={{ span: 12 }} className="childrens-space mt-1 p-0">
						{this.props.children}
					</Col>
				</Row>
			</div>
		);
	}
}

export default NavLayout;
