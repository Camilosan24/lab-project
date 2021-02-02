import React from "react";
import "./styles.css";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import CarouselComponent from "./Carousel";

class Login extends React.Component {
	constructor(props) {
		super();
		this.state = {
			error: false,
			userData: {
				user: "",
				password: "",
			},
		};
	}

	fetchAll = (e) => {
		fetch(
			`http://localhost:3001/api?user=${this.state.user}&pass=${this.state.password}`
		)
			.then((res) => res.json())
			.then((data) => console.log(data));
	};

	handleClick = (e) => {
		e.preventDefault();
		this.setState({ error: !this.state.error });
	};
	handleChange = (e) => {
		if (e.target.name === "user" || "password") {
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
				<CarouselComponent />
				<Col
					className="background-login-2"
					style={{
						position: "absolute",
						height: "100vh",
						width: "100vw",
						margin: "0",
						padding: "0",
						left: "0.0002%",
						backgroundColor: "black",
						opacity: "0.7",
					}}
				></Col>
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
											<Form.Label>Usuario:</Form.Label>
											<Form.Control
												type="text"
												placeholder="Ingresar Usuario"
												onChange={this.handleChange}
												value={this.state.userData.user}
												name="user"
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
											onClick={this.handleClick}
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
