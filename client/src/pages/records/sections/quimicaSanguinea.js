import React from "react";
import { Col, Row, Card, Form, FormControl } from "react-bootstrap";
import "../styles.css";

class QuimicaSanguinea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			acidoUrico: "",
			bun: "",
			creatinina: "",
			glicemiaBasal: "",
			colesterolTotal: "",
			colesterolHDL: "",
			colesterolLDL: "",
			colesterolVLDL: "",
			trigliceridos: "",
			indiceAterogenico: "",
		};
	}

	onChangeValues = (e) => {
		let inputName = e.target;
		this.setState({ [inputName.name]: inputName.value }, () => {
			this.props.changeData(5, this.state);
		});
	};
	render() {
		return (
			<Card className="p-4 mt-3">
				<div
					onClick={() => {
						this.props.deleteComp(this, "quimicaSanguinea");
						this.props.changeData(5, {});
					}}
					className="delete-exam rounded-circle"
				>
					<i className="fas fa-minus"></i>
				</div>

				<Card.Header className="m-auto">
					<h5>Quimica Sanguinea</h5>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={this.handleOnSubmit}>
						<Form.Group>
							<Row>
								<Col md={{ span: 4, offset: 7 }}>
									<Row>
										<Form.Label className="m-auto">Resultados</Form.Label>
									</Row>
								</Col>
							</Row>
						</Form.Group>
						<hr />
						<Row>
							<Col>
								<h6>Examen Fisico</h6>
							</Col>
						</Row>
						<hr />
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Acido Urico mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="acidoUrico"

										value={this.state.acidoUrico}
										onChange={this.onChangeValues}
										required
									></FormControl>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>BUN mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										name="bun"
										value={this.state.bun}
										onChange={this.onChangeValues}
										required
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Creatinina mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="creatinina"
										value={this.state.creatinina}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Glicemia Basal mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="glicemiaBasal"
										value={this.state.glicemiaBasal}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<hr />
						<Row>
							<Col>
								<h6>Perfil Lipidico</h6>
							</Col>
						</Row>
						<hr />
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Colesterol Total mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="colesterolTotal"
										value={this.state.colesterolTotal}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Colesterol HDL mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="colesterolHDL"
										value={this.state.colesterolHDL}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Colesterol LDL mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="colesterolLDL"
										value={this.state.colesterolLDL}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Colesterol VLDL mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="colesterolVLDL"
										value={this.state.colesterolVLDL}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Trigliceridos mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="trigliceridos"
										value={this.state.trigliceridos}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Indice Aterogenico:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="indiceAterogenico"
										value={this.state.indiceAterogenico}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		);
	}
}

export default QuimicaSanguinea;
