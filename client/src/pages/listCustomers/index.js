import React from "react";
import { Col, Table, Card, Button, Form } from "react-bootstrap";
import Field from "./field";
import requests from "../../components/utilComponents/requests";
import NoData from "../../components/utilComponents/noData";
import SpinnerComponent from "../../components/utilComponents/spinner";
import { Toast } from "../../components/alerts/alert";
import "./styles.css";

class List extends React.Component {
	constructor(props) {
		super(props);
		this.requests = requests();
		this.state = {
			fields: [],
			loading: false,
			skip: 0,
			deleteCustomerButton: true,
			deleteCustomerInput: "",
			deleteCustomer: false,
			tempCustomerToDelete: "",
		};
	}
	async componentDidMount() {
		// let response = await requests().auth(this.props);
		// if (response) {
		this.addCustomers();
		// }
	}

	handleOnChange = (e) => {
		this.setState({ deleteCustomerInput: e.target.value }, () => {
			if (this.state.deleteCustomerInput === "confirmar") {
				this.setState({ deleteCustomerButton: false });
			} else {
				this.setState({ deleteCustomerButton: true });
			}
		});
	};

	onClickDelete = () => {
		requests()
			.deleteCustomerByCC(this.state.tempCustomerToDelete)
			.then((res) => {
				if (res.data.success) {
					this.addCustomers();
					Toast.fire({
						icon: "success",
						title: res.data.message,
					});
					setTimeout(() => {
						return this.tempDeleteCustomer();
					}, 1500);
				}
				return Toast.fire({
					icon: "error",
					title: res.data.message,
				});
			});
	};

	addCustomers = () => {
		this.requests.getCustomers(this.state.skip).then((res) => {
			if (res.data.customers.length > 0) {
				this.setState({ skip: this.state.skip + 10 });
				return res.data.customers.map((customer) => {
					return this.setState({ fields: [...this.state.fields, customer] });
				});
			} else if (this.state.fields === []) {
				return this.setState({ fields: null });
			}
		});
	};

	tempDeleteCustomer = (value = "") => {
		console.log(this.state.fields);
		this.setState({
			deleteCustomer: !this.state.deleteCustomer,
			tempCustomerToDelete: value,
			deleteCustomerButton: value === "" ? false : true,
		});

		if (!this.state.deleteCustomer) {
			this.setState({ deleteCustomerInput: "" });
		}
	};
	render() {
		return !this.state.deleteCustomer ? (
			<Col md={{ span: 12 }} xs={{ span: 12 }} className="mt-5 pb-5">
				<Card className="p-md-5 p-2">
					<h2>Listado de Clientes</h2>
					<hr />
					<Card.Body className="p-1">
						<Table striped bordered hover size="lg" responsive={true}>
							<thead>
								<tr>
									<th>#</th>
									<th>Cedula</th>
									<th>Nombres</th>
									<th>Apellidos</th>
									<th>Correo</th>
									<th>Direccion</th>
									<th>Fecha de nacimiento</th>
									<th>Edad</th>
									<th>ELIMINAR</th>
								</tr>
							</thead>
							<tbody>
								{this.state.fields !== null ? (
									this.state.fields.map((info, index) => (
										<Field
											info={info}
											key={index}
											number={index + 1}
											tempDeleteCustomer={this.tempDeleteCustomer}
										/>
									))
								) : (
									<NoData cols="8" />
								)}
							</tbody>
						</Table>
						{this.state.fields.length >= 10 && (
							<Col md={{ span: 2, offset: 5 }}>
								<Button
									id="showMore"
									block
									variant="secondary"
									onClick={this.addCustomers}
								>
									{this.state.loading ? <SpinnerComponent /> : "Mostrar mas"}
								</Button>
							</Col>
						)}
					</Card.Body>
				</Card>
			</Col>
		) : (
			<Col md={{ span: 4, offset: 4 }} xs={{ span: 12 }}>
				<div className="mt-5">
					<Card className=" justify-content-center">
						<Card.Header>
							Escriba <i className="text-muted">confirmar</i> para eliminar el
							cliente
						</Card.Header>
						<Card.Body className="d-flex flex-column">
							<Form.Control
								type="text"
								onChange={this.handleOnChange}
								value={this.state.deleteCustomerInput}
							/>
							<div className="d-flex justify-content-end confirmation-buttons">
								<Button
									variant="light"
									className="mt-3 mr-3"
									onClick={() => this.tempDeleteCustomer()}
								>
									Cancelar
								</Button>
								<Button
									variant="danger"
									disabled={this.state.deleteCustomerButton}
									className="mt-3"
									onClick={this.onClickDelete}
								>
									Eliminar
								</Button>
							</div>
						</Card.Body>
					</Card>
				</div>
			</Col>
		);
	}
}

export default List;
