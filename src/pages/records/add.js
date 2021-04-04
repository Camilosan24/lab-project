import React from "react";
import Serologicas from "./sections/serologicas";
import CuadroHematico from "./sections/cuadroHematico";
import { Form, FormControl, Col, Card, Row, Button } from "react-bootstrap";
import axios from "axios";
import SpinnerComponent from "../../components/utilComponents/spinner";
import "./styles.css";

class AddRecord extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			finder: "",
			loading: false,
			date: () => {
				let now = Date.now();
				let fechaActual = new Date(now);
				return fechaActual.toLocaleDateString();
			},
			addSection: false,
			showSections: false,
			sections: [],
			noExams: 0,
			message: "",
			customerData: {
				completeName: "",
				age: "",
				genre: "",
			},
			serologicas: false,
			cuadroHematico: false,
			coprologico: false,
			parcialOrina: false,
			quimicaSanguinea: false,
			dataComponents: {
				serologicas: {},
				cuadroHematico: {},
				coprologico: {},
				parcialOrina: {},
				quimicaSanguinea: {},
			},
		};
	}

	changeOrClearState = (
		loading,
		addSection,
		customerData,
		message,
		sections = this.state.sections,
		dataComponents
	) => {
		this.setState({
			loading: loading,
			addSection: addSection,
			message: message,
			sections: sections,
		});
		if (customerData === true) {
			this.setState({ customerData: { completeName: "", age: "", genre: "" } });
		} else if (customerData) {
			this.setState({ customerData: customerData });
		}

		if (dataComponents) {
			this.setState({
				dataComponents: {
					serologicas: {},
					cuadroHematico: {},
					coprologico: {},
					parcialOrina: {},
					quimicaSanguinea: {},
				},
			});
		}
	};

	add = () => {
		axios
			.post("/api/customer/addrecord", { cc: this.state.searchInput })
			.then((res) => {
				console.log(res.data);
			});
	};

	changeData = (noComponentData, datos) => {
		const actualState = { ...this.state.dataComponents };
		switch (noComponentData) {
			case 1:
				actualState.serologicas = datos;
				this.setState({
					dataComponents: actualState,
				});
				break;
			case 2:
				actualState.cuadroHematico = datos;
				this.setState({
					dataComponents: actualState,
				});
				break;
			default:
				break;
		}
	};

	requestCustomer = () => {
		axios
			.post("/api/customer/getcustomers", {
				cc: this.state.finder,
			})
			.then((res) => {
				const customer = res.data.customer;
				if (customer) {
					this.changeOrClearState(false, true, {
						completeName: `${customer.name} ${customer.lastname}`,
						age: customer.age,
						genre: customer.genre,
					});
				} else {
					this.changeOrClearState(false, false, false, res.data.message, []);
				}
			});
	};

	chooseSection = (value) => {
		switch (value) {
			case "serologicas":
				return this.setState({
					sections: [
						...this.state.sections,
						<Serologicas
							deleteComp={this.onClickDelete}
							key={this.state.noExams}
							changeData={this.changeData}
						/>,
					],
					noExams: this.state.noExams + 1,
					serologicas: true,
				});

			case "cuadroHematico":
				return this.setState({
					sections: [
						...this.state.sections,
						<CuadroHematico
							deleteComp={this.onClickDelete}
							key={this.state.noExams}
							changeData={this.changeData}
						/>,
					],
					noExams: this.state.noExams + 1,
					cuadroHematico: true,
				});
			default:
				break;
		}
	};

	ableButtons = () => {
		this.setState({
			serologicas: false,
			cuadroHematico: false,
			coprologico: false,
			parcialOrina: false,
			quimicaSanguinea: false,
		});
	};

	onChangeFinder = (e) => {
		this.setState({ finder: e.target.value }, () => {
			this.setState({ showSections: false });
			if (this.state.finder.length < 1) {
				this.changeOrClearState(false, false, true, false, "", [], true);
				this.ableButtons();
			} else if (this.state.finder.length === 10) {
				this.requestCustomer();
			} else {
				this.setState({ showSections: false });
				this.ableButtons();
				this.changeOrClearState(true, false, true, false, "", [], true);
			}
		});
	};

	onClickAddSection = (e) => {
		if (e.target.name === "button-addSection") {
			this.setState({ showSections: true });
		} else {
			this.setState({ showSections: !this.state.showSections }, () => {
				this.chooseSection(e.target.name);
			});
		}
	};

	onClickDelete = (component, compName) => {
		this.setState({ showSections: false });
		let response = window.confirm("¿Esta seguro de eliminar este Examen?");
		if (response) {
			let newComponents = this.state.sections.filter((element) => {
				return element.key !== component._reactInternals.key;
			});
			this.setState({ sections: newComponents, [compName]: false });
		}
	};

	render() {
		return (
			<Col md={{ span: 6, offset: 3 }} className="mt-5 pb-5">
				<Row>
					<Card>
						<Card.Header>
							<h2 className="">FORMULARIO DE REGISTRO</h2>
						</Card.Header>

						<Card.Body>
							<Form onSubmit={this.handleOnSubmit}>
								<Row>
									<Col>
										<Form.Group>
											<Form.Label>
												Nombre Completo: <span className="text-danger">*</span>
											</Form.Label>
											<FormControl
												type="text"
												name="name"
												value={this.state.customerData.completeName}
												disabled
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group>
											<Form.Label>
												Nº Documento: <span className="text-danger">*</span>
											</Form.Label>
											<FormControl
												type="text"
												name="name"
												onChange={this.onChangeFinder}
												value={this.state.finder}
												autoComplete="off"
												maxLength="10"
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col>
										<Row>
											<Col>
												<Form.Group>
													<Form.Label>
														Edad: <span className="text-danger">*</span>
													</Form.Label>
													<FormControl
														type="text"
														name="name"
														value={this.state.customerData.age}
														disabled
													/>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group>
													<Form.Label>
														Sexo: <span className="text-danger">*</span>
													</Form.Label>
													<FormControl
														type="text"
														name="name"
														value={this.state.customerData.genre}
														disabled
													/>
												</Form.Group>
											</Col>
										</Row>
									</Col>
									<Col>
										<Form.Group>
											<Form.Label>
												Fecha: <span className="text-danger">*</span>
											</Form.Label>
											<FormControl
												type="text"
												name="name"
												onChange={this.handleInputOnChange}
												value={this.state.date()}
												disabled
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Form.Label className="m-auto">
										<span className="text-danger">{this.state.message}</span>
									</Form.Label>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</Row>
				{this.state.sections}
				{this.state.showSections && (
					<Row className="mt-3">
						<Card className="col-12">
							<Card.Header className="m-auto">
								<h4>EXAMENES</h4>
							</Card.Header>
							<Card.Body>
								<Row>
									<Col>
										<Button
											onClick={this.onClickAddSection}
											disabled={this.state.serologicas}
											variant="danger"
											name="serologicas"
											block
										>
											Serologicas
										</Button>
									</Col>
									<Col>
										<Button
											onClick={this.onClickAddSection}
											variant="info"
											name="cuadroHematico"
											disabled={this.state.cuadroHematico}
											block
										>
											Cuadro Hematico
										</Button>
									</Col>
									<Col>
										<Button
											onClick={this.onClickAddSection}
											name="coprologico"
											variant="success"
											disabled={this.state.coprologico}
											block
										>
											Coprologico
										</Button>
									</Col>
								</Row>
								<Row className="mt-3">
									<Col>
										<Button
											onClick={this.onClickAddSection}
											name="parcialOrina"
											variant="dark"
											disabled={this.state.parcialOrina}
											block
										>
											Parcial de Orina
										</Button>
									</Col>
									<Col>
										<Button
											onClick={this.onClickAddSection}
											name="quimicaSanguinea"
											variant="warning"
											disabled={this.state.quimicaSanguinea}
											block
										>
											Quimica sanguinea
										</Button>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Row>
				)}
				<Row className="justify-content-center mt-3">
					{this.state.loading ? (
						<SpinnerComponent />
					) : (
						this.state.addSection && (
							<div
								className="addSection-button"
								name="button-addSection"
								onClick={this.onClickAddSection}
							>
								<span name="button-addSection">
									<i class="fas fa-plus" name="button-addSection"></i>
								</span>
							</div>
						)
					)}
				</Row>
			</Col>
		);
	}
}
export default AddRecord;