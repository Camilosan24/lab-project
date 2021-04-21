import React from "react";
import { Form, FormControl, Col, Card, Button } from "react-bootstrap";
import requests from "../../components/utilComponents/requests";
import SpinnerComponent from "../../components/utilComponents/spinner";
import { Toast } from "../../components/alerts/alert";

class AddCustomer extends React.Component {
	constructor(props) {
		super(props);
		this.requests = requests();
		this.state = {
			customerData: {
				name: "",
				lastname: "",
				cc: "",
				direction: "",
				email: "",
				phone: "",
				birthdate: "",
				genre: "Default...",
			},
			message: "",
			submitingData: false,
			buttonVariant: "primary",
		};
	}
	// async componentDidMount(){
	// 	return await requests().auth(this.props)
	// }

	changeState = (e) => {
		let value = e.target.value;
		this.setState({
			customerData: {
				...this.state.customerData,
				[e.target.name]: value,
			},
		});
	};

	handleInputOnChange = (e) => {
		if (e.target.value === "") {
			this.changeState(e);
		}
		if (e.target.name === "cc" || e.target.name === "phone") {
			if (!Number(e.target.value)) {
				return;
			}
		}
		this.changeState(e);
	};

	showMessageAndClean = (res) => {
		if (res.data.success) {
			Toast.fire({
				icon: "success",
				title: "Cliente añadido correctamente",
			});
			this.setState({ buttonVariant: "success" });
		} else {
			Toast.fire({
				icon: "error",
				title: res.data.message,
			});
			this.setState({ buttonVariant: "danger" });
		}
		setTimeout(() => {
			this.setState({ buttonVariant: "primary", message: "" });
		}, 3000);

		this.setState({
			submitingData: false,
			customerData: {
				name: "",
				lastname: "",
				cc: "",
				direction: "",
				email: "",
				phone: "",
				birthdate: "",
				genre: "",
			},
		});
	};

	handleOnSubmit = (e) => {
		e.preventDefault();
		let confirmation = window.confirm("¿Estas seguro de guardar estos datos?");
		if (confirmation) {
			if (this.state.customerData.genre === "Default...") {
				this.setState({
					message: "Por favor elija un genero",
					buttonVariant: "danger",
				});
				setTimeout(() => {
					this.setState({ message: "", buttonVariant: "primary" });
				}, 2000);
			} else {
				this.setState({ submitingData: true });
				this.requests.addCustomer(this.state.customerData).then((res) => {
					this.showMessageAndClean(res);
				});
			}
		}
	};
	render() {
		return (
			<Col md={{ span: 4, offset: 4 }} className="mt-5 pb-5">
				<Card className="p-3">
					<h2>FORMULARIO DE REGISTRO DE NUEVO CLIENTE</h2>
					<hr />

					<Card.Body>
						<Form onSubmit={this.handleOnSubmit}>
							<Form.Group>
								<Form.Label>
									Nombres: <span className="text-danger">*</span>
								</Form.Label>
								<FormControl
									type="text"
									name="name"
									onChange={this.handleInputOnChange}
									value={this.state.customerData.name}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>
									Apellidos: <span className="text-danger">*</span>
								</Form.Label>
								<FormControl
									type="text"
									name="lastname"
									onChange={this.handleInputOnChange}
									value={this.state.customerData.lastname}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>
									Cedula de Ciudadania: <span className="text-danger">*</span>
								</Form.Label>
								<FormControl
									type="text"
									name="cc"
									onChange={this.handleInputOnChange}
									value={this.state.customerData.cc}
									required
									maxLength="10"
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>
									Genero <span className="text-danger">*</span>
								</Form.Label>
								<Form.Control
									as="select"
									name="genre"
									onChange={this.handleInputOnChange}
									value={this.state.customerData.genre}
									required
								>
									<option>Default...</option>
									<option>MUJER</option>
									<option>HOMBRE</option>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>
									Direccion: <span className="text-danger">*</span>
								</Form.Label>
								<FormControl
									type="text"
									name="direction"
									onChange={this.handleInputOnChange}
									value={this.state.customerData.direction}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>
									E-mail: <span className="text-danger">*</span>
								</Form.Label>
								<FormControl
									type="text"
									name="email"
									onChange={this.handleInputOnChange}
									value={this.state.customerData.email}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>
									Telefono: <span className="text-danger">*</span>
								</Form.Label>
								<FormControl
									type="tel"
									name="phone"
									onChange={this.handleInputOnChange}
									maxLength="10"
									value={this.state.customerData.phone}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>
									Fecha de nacimiento: <span className="text-danger">*</span>
								</Form.Label>
								<FormControl
									type="date"
									name="birthdate"
									onChange={this.handleInputOnChange}
									value={this.state.customerData.birthdate}
									required
								/>
							</Form.Group>
							{this.state.message && (
								<Form.Group>
									<span className="text-danger">{this.state.message}</span>
								</Form.Group>
							)}

							<Form.Group>
								<Button type="submit" variant={this.state.buttonVariant} block>
									{this.state.submitingData ? <SpinnerComponent /> : "Enviar"}
								</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}
export default AddCustomer;
