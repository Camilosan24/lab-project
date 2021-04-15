import React from "react";
import Serologicas from "./sections/serologicas";
import Coprologico from "./sections/coprologico";
import CuadroHematico from "./sections/cuadroHematico";
import ParcialOrina from "./sections/parcialOrina";
import { Form, FormControl, Col, Card, Row, Button } from "react-bootstrap";
import requests from "../../components/utilComponents/requests";
import SpinnerComponent from "../../components/utilComponents/spinner";
import ButtonSave from "../../components/utilComponents/buttonSave";
import QuimicaSanguinea from "./sections/quimicaSanguinea";
import { Toast } from "../../components/alerts/alert";
import "./styles.css";

class AddRecord extends React.Component {
	constructor(props) {
		super(props);
		this.requests = requests();
		this.state = {
			finder: "",
			loading: false,
			searchingData: false,
			date: () => {
				let now = Date.now();
				let fechaActual = new Date(now);
				return fechaActual.toLocaleDateString();
			},

			pdfGenerator: true,
			addSection: false,
			showSections: false,

			saveSection: false,
			noExams: 0,
			message: "",
			sections: [],
			customerData: {
				completeName: "",
				age: "",
				genre: "",
				cc: "",
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

	async componentDidMount() {
		return await requests().auth(this.props);
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
			this.setState({
				customerData: { completeName: "", age: "", genre: "", cc: "" },
			});
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

	addRecord = async () => {
		await this.requests
			.addRecord({
				cc: this.state.customerData.cc,
				newRecord: this.state.dataComponents,
			})
			.then((res) => {
				if (res.data.success) {
					this.changeOrClearState(false, true, false, "", [], true);
					Toast.fire({
						icon: "success",
						title: "Registro Añadido",
					});
					this.setState({
						serologicas: false,
						cuadroHematico: false,
						quimicaSanguinea: false,
						coprologico: false,
						parcialOrina: false,
					});
				} else {
					Toast.fire({
						icon: "error",
						title: res.data.message,
					});
					this.setState({
						serologicas: false,
						cuadroHematico: false,
						quimicaSanguinea: false,
						coprologico: false,
						parcialOrina: false,
					});
				}
			});
		return true;
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
			case 3:
				actualState.coprologico = datos;
				this.setState({
					dataComponents: actualState,
				});
				break;
			case 4:
				actualState.parcialOrina = datos;
				this.setState({
					dataComponents: actualState,
				});
				break;

			case 5:
				actualState.quimicaSanguinea = datos;
				this.setState({
					dataComponents: actualState,
				});
				break;

			default:
				break;
		}
	};

	requestCustomer = () => {
		this.requests.getCustomerByCc(this.state.finder).then((res) => {
			this.setState({searchingData: false})
			const customer = res.data.customer;
			if (customer) {
				this.changeOrClearState(false, true, {
					completeName: `${customer.name} ${customer.lastname}`,
					age: customer.age,
					genre: customer.genre,
					cc: customer.cc,
				});
			} else {
				this.changeOrClearState(false, false, true, res.data.message, []);
				setTimeout(() => {
					this.setState({ message: "" });
				}, 2000);
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

			case "coprologico":
				return this.setState({
					sections: [
						...this.state.sections,
						<Coprologico
							deleteComp={this.onClickDelete}
							key={this.state.noExams}
							changeData={this.changeData}
						/>,
					],
					noExams: this.state.noExams + 1,
					coprologico: true,
				});

			case "parcialOrina":
				return this.setState({
					sections: [
						...this.state.sections,
						<ParcialOrina
							deleteComp={this.onClickDelete}
							key={this.state.noExams}
							changeData={this.changeData}
						/>,
					],
					noExams: this.state.noExams + 1,
					parcialOrina: true,
				});

			case "quimicaSanguinea":
				return this.setState({
					sections: [
						...this.state.sections,
						<QuimicaSanguinea
							deleteComp={this.onClickDelete}
							key={this.state.noExams}
							changeData={this.changeData}
						/>,
					],
					noExams: this.state.noExams + 1,
					quimicaSanguinea: true,
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
		if (e.target.value === "") {
			this.setState({ finder: e.target.value });
			this.setState({ loading: false });
		}
		if (!Number(e.target.value)) {
			return;
		}
		this.setState({ finder: e.target.value });
	};

	onClickSearch = () => {
		this.setState({searchingData: true})
		this.requestCustomer();
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
			<Col md={{ span: 6, offset: 3 }} className="mt-5 pb-5 mainRecords">
				<Card className="p-2">
					<h2>FORMULARIO DE REGISTRO</h2>
					<hr />
					<Card.Body>
						<Form onSubmit={this.handleOnSubmit}>
							<Row>
								<Col xs={{ span: 12, order: 2 }} md={6}>
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
								<Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }}>
									<Form.Group>
										<Form.Label>
											Nº Documento: <span className="text-danger">*</span>
										</Form.Label>
										<FormControl
											type="text"
											name="finder"
											onChange={this.onChangeFinder}
											value={this.state.finder}
											autoComplete="off"
											maxLength="10"
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
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
								<Col xs={{ span: 12, order: 1 }} md={6}>
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
					<Row>
						<Col md={{ span: 4, offset: 4 }} xs={{ span: 8, offset: 2 }}>
							<Button block variant="secondary" onClick={this.onClickSearch}>
								{this.state.searchingData ? <SpinnerComponent /> : "Buscar"}
							</Button>
						</Col>
					</Row>
				</Card>
				{this.state.sections})
				{this.state.showSections && (
					<Card className="mt-3">
						<Card.Header className="m-auto">
							<h4>EXAMENES</h4>
						</Card.Header>
						<Card.Body>
							<Row>
								<Col xs={12} md={4} className="mt-3 mt-md-0">
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
								<Col xs={12} md={4} className="mt-3 mt-md-0">
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
								<Col xs={12} md={4} className="mt-3 mt-md-0">
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
							<Row className="mt-0 mt-md-3">
								<Col xs={12} md={6} className="mt-3 mt-md-0">
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
								<Col xs={12} md={6} className="mt-3 mt-md-0">
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
									<i className="fas fa-plus" name="button-addSection"></i>
								</span>
							</div>
						)
					)}
				</Row>
				{this.state.sections.length === 0 ? null : (
					<ButtonSave
						clearState={this.changeOrClearState}
						addRecord={this.addRecord}
					/>
				)}
			</Col>
		);
	}
}
export default AddRecord;
