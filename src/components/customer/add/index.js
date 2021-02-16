import React from "react";
import { Form, FormControl, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import SpinnerComponent from "../../utilComponents/spinner";

class AddCustomer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			customerData: {
				name: "",
				lastname: "",
				CC: "",
				direction: "",
				email: "",
				phone: "",
				birthday: "",
			},
			message: "",
			submitingData: false,
			buttonVariant: "primary",
		};
	}

	handleInputOnChange = (e) => {
		let value = e.target.value;
		this.setState({
			customerData: {
				...this.state.customerData,
				[e.target.name]: value,
			},
		});
	};

	showMessageAndClean = (res) => {
		this.setState({ message: res.data.message });
		if (res.data.success) {
			this.setState({ buttonVariant: "success" });
		} else {
			this.setState({ buttonVariant: "danger" });
		}
		setTimeout(() => {
			this.setState({ buttonVariant: "primary", message: '' });
		},3000);

		this.setState({
			submitingData: false,
			formData: {
				name: "",
				lastname: "",
				CC: "",
				direction: "",
				email: "",
				phone: "",
				birthday: "",
			},
		});
	};

	handleOnSubmit = (e) => {
		e.preventDefault();
		this.setState({ submitingData: true });

		axios.post("/api/customer/add", this.state.customerData).then((res) => {
			this.showMessageAndClean(res);
		});
	};

	render() {

		return (
			<Col md={{ span: 4, offset: 4 }} className="mt-5">
				<Card>
					<Card.Header>
						<h2 className="">FORMULARIO DE REGISTRO DE NUEVO CLIENTE</h2>
					</Card.Header>

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
									name="CC"
									onChange={this.handleInputOnChange}
									value={this.state.customerData.CC}
									required
								/>
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
									type="text"
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
									name="birthday"
									onChange={this.handleInputOnChange}
									value={this.state.customerData.birthday}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Text className={`text-${this.state.buttonVariant}`} >
									{this.state.message}
								</Form.Text>
							</Form.Group>
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
