import React from "react";
import "./styles.css";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import CarouselComponent from "../carousel";
import axios from "axios";

class Login extends React.Component {
	constructor(props) {
		super();
		this.state = {
			error: false,
			userData: {
				email: "",
				password: "",
			},
		};
	}

	login = async (e) => {
		e.preventDefault();
		axios.post(`/api/user/login`, this.state.userData).then((res) => {
			console.log(res.data);
			if (res.data.auth) {
				this.props.history.push('/home')
			}
		});
		this.setState({ userData: { email: "", password: "" } });
	};

	logout = async (e) => {
		e.preventDefault();
		axios.get(`/api/user/logout`).then((res) => console.log(res.data));
		this.setState({ userData: { email: "", password: "" } });
	};

	auth = async (e) => {
		e.preventDefault();
		axios.get(`/api/user/auth`).then((res) => console.log(res.data));
	};

	handleClick = (e) => {
		e.preventDefault();
		this.setState({ error: !this.state.error });
	};
	handleChange = (e) => {
		if (e.target.name === "email" || "password") {
			this.setState({
				userData: {
					...this.state.userData,
					[e.target.name]: e.target.value,
				},
			});
		}
	};

	render() {
		return (
			<Row>
				<Col>
					<CarouselComponent />
				</Col>
				<Col
					style={{ position: "absolute", top: "25%" }}
					md={{ offset: "4", span: "4" }}
					xs={{ offset: "1", span: "10" }}
				>
					<Row>
						<Col
							md={{ span: "8", offset: "2" }}
							xs={{ offset: "1", span: "11" }}
						>
							<Card>
								<Card.Body>
									<Form>
										<Form.Group>
											<Form.Label>E-mail:</Form.Label>
											<Form.Control
												type="text"
												placeholder="Ingresar Usuario"
												onChange={this.handleChange}
												value={this.state.userData.email}
												name="email"
												autoComplete="off"
											></Form.Control>
										</Form.Group>
										<Form.Group>
											<Form.Label>Contraseña:</Form.Label>
											<Form.Control
												type="password"
												placeholder="Ingresar Contraseña"
												onChange={this.handleChange}
												value={this.state.userData.password}
												name="password"
												autoComplete="off"
											></Form.Control>
											{this.state.error && (
												<Form.Text className="text-danger">
													Usuario y/o contraseña incorrecta
												</Form.Text>
											)}
										</Form.Group>
										<Button
											className="btn-block"
											variant="secondary
											"
											type="submit"
											onClick={this.login}
										>
											Entrar
										</Button>
									</Form>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default Login;
