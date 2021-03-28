import React from "react";
import "./styles.css";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import CarouselComponent from "../carousel";
import requests from "../utilComponents/requests";

class Login extends React.Component {
	constructor(props) {
		super();
		this.requests = requests();
		this.user = React.createRef();
		this.password = React.createRef();
		this.state = {
			messages: {
				user: "",
				password: "",
			},
			userData: {
				user: "",
				password: "",
			},
		};
	}

	login = (e) => {
		e.preventDefault();
		this.requests.login(this.state.userData).then((res) => {
			if (res.data.auth) {
				this.props.history.push("/home");
			} else if (res.data.message === "No existe el usuario") {
				this.user.current.className += " wrongField";
				this.setState({
					messages: { user: "No existe el usuario", password: "" },
				});
				setTimeout(() => {
					this.user.current.className = "form-control";
					this.setState({ messages: { user: "", password: "" } });
					this.setState({ error: false });
				}, 1000);
			} else if (res.data.message === "Contraseña incorrecta") {
				this.password.current.className += " wrongField";
				this.setState({
					messages: { user: "", password: "Contraseña incorrecta" },
				});
				setTimeout(() => {
					this.password.current.className = "form-control";
					this.setState({ messages: { user: "", password: "" } });
					this.setState({ error: false });
				}, 1000);
			}
			this.setState({ userData: { email: "", password: "" } });
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
			<Row className="m-0">
				<CarouselComponent />
				<Col
					style={{ position: "absolute", top: "15%", padding: 0 }}
					md={{ offset: 4, span: 4 }}
					xs={12}
				>
					<Row className="m-0">
						<Col md={{ span: 8, offset: 2 }} xs={{ span: 12, offset: 0 }}>
							<Card>
								<div className="loginLogo mt-3">
									<span>
										<i className="fas fa-vial"></i>
									</span>
								</div>
								<Card.Body>
									<Form>
										<Form.Group className="">
											<i className="fas fa-user icon" ref={this.user}></i>
											<Form.Control
												type="text"
												placeholder="Usuario"
												onChange={this.handleChange}
												value={this.state.userData.user}
												name="user"
												autoComplete="off"
												className="icon-input"
												ref={this.user}
											></Form.Control>
										</Form.Group>
										<Form.Group>
											<Form.Text className="text-danger">
												{this.state.messages.user}
											</Form.Text>
										</Form.Group>
										<Form.Group className="mt-3">
											<i className="fas fa-lock icon"></i>
											<Form.Control
												type="password"
												placeholder="Contraseña"
												onChange={this.handleChange}
												value={this.state.userData.password}
												name="password"
												autoComplete="off"
												className="icon-input"
												ref={this.password}
											></Form.Control>
										</Form.Group>
										<Form.Group>
											<Form.Text className="text-danger">
												{this.state.messages.password}
											</Form.Text>
										</Form.Group>

										<Button
											type="submit"
											className="btn-block mb-3"
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
