import React from "react";
import { Col, Table, Card, Button } from "react-bootstrap";
import Field from "./field";
import requests from "../../components/utilComponents/requests";
import NoData from "../../components/utilComponents/noData";
import SpinnerComponent from "../../components/utilComponents/spinner";
import DeleteConfirmation from "../../components/deleteConfirmations/deleteConfirmartion";
import InputSearchCustomer from "../../components/inputSearchCustomer/inputSearchCustomer";
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
			tempCustomerToDelete: {},
			fieldsCount: 1,
		};
	}
	async componentDidMount() {
		let response = await requests().auth(this.props);
		if (response) {
			this.addCustomers();
		}
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
			.deleteCustomerByCC(this.state.tempCustomerToDelete.cc)
			.then((res) => {
				if (res.data.success) {
					Toast.fire({
						icon: "success",
						title: res.data.message,
					});
					this.tempDeleteCustomer();
					return this.setState({ fieldsCount: 1, skip: 0, fields: [] }, () => {
						this.addCustomers();
					});
				}

				return Toast.fire({
					icon: "error",
					title: res.data.message,
				});
			});
	};

	addCustomers = () => {
		this.requests.getCustomers(this.state.skip).then((res) => {
			if (res.data?.customers?.length > 0) {
				this.setState({
					skip: this.state.skip + 10,
				});
				const data = res.data.customers.map((info, index) => {
					return (
						<Field
							info={info}
							key={this.state.fieldsCount}
							number={index + 1}
							tempDeleteCustomer={this.tempDeleteCustomer}
						/>
					);
				});
				return this.setState({
					fields: [...this.state.fields, data]
				});
			}
			return this.setState({ fields: null });
		});
	};

	tempDeleteCustomer = (infoToDelete = "") => {
		this.setState({
			deleteCustomer: !this.state.deleteCustomer,
			tempCustomerToDelete: infoToDelete,
			deleteCustomerButton: infoToDelete?.cc === "" ? false : true,
		});

		if (!this.state.deleteCustomer) {
			this.setState({ deleteCustomerInput: "" });
		}
	};

	editCustomerData = (data) => {
		this.setState({ skip: 0 });
		if (data !== null) {
			return this.setState({
				fields: [
					<Field
						key={1}
						info={data.customer}
						number={1}
						tempDeleteCustomer={this.tempDeleteCustomer}
					/>,
				],
			});
		}
		this.setState({ fields: [], fieldsCount: 1 });
		return this.addCustomers();
	};
	render() {
		return (
			<>
				<Col md={{ span: 12 }} xs={{ span: 12 }} className="mt-5 pb-5">
					<Card className="p-md-5 p-2">
						<h2>Listado de Clientes</h2>
						<hr />
						<Card.Body className="p-1">
							<InputSearchCustomer editCustomerData={this.editCustomerData} />
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
										this.state.fields
									) : (
										<NoData cols="9" />
									)}
								</tbody>
							</Table>
							{this.state.fields !== null && this.state.fields.length >= 10 && (
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
				{this.state.deleteCustomer && (
					<DeleteConfirmation
						handleOnChange={this.handleOnChange}
						componentState={{
							deleteCustomerButton: this.state.deleteCustomerButton,
							deleteCustomerInput: this.state.deleteCustomerInput,
						}}
						onClickDelete={this.onClickDelete}
						tempDeleteCustomer={this.tempDeleteCustomer}
					/>
				)}
			</>
		);
	}
}

export default List;
