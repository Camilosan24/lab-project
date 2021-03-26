import React from "react";
import "./styles.css";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import CarouselComponent from "../carousel";
import requests from "../utilComponents/requests";

class Login extends React.Component {
	constructor(props) {
		super();
		this.requests = requests();
		this.state = {
			error: false,
			userData: {
				email: "",
				password: "",
			},
		};
	}

	login = (e) => {
		e.preventDefault();
		this.requests.login(this.state.userData).then((res) => {
			if (res.data.auth) {
				this.props.history.push("/home");
			} else {
				this.setState({ error: true });
				setTimeout(() => {
					this.setState({ error: false });
				}, 2000);
			}
		});
	};

	logout = (e) => {
		e.preventDefault();
		this.requests.logout().then((res) => console.log(res.data));
		this.setState({ userData: { email: "", password: "" } });
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
											type="submit"
											className="btn-block"
											variant="secondary"
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
