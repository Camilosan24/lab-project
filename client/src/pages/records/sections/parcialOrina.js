import React from "react";
import { Col, Row, Card, Form, FormControl } from "react-bootstrap";
import "../styles.css";

class ParcialOrina extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: "",
			aspecto: "",
			densidad: "",
			ph: "",
			nitritos: "",
			esterasas: "",
			glucosa: "",
			sangre: "",
			proteinas:"",
			celulas: "",
			leucocitos: "",
			bacterias: ""
		};
	}

	onChangeValues = (e) => {
		let inputName = e.target;
		this.setState({ [inputName.name]: inputName.value }, () => {
			this.props.changeData(4, this.state);
		});
	};
	render() {
		return (
			<Card className="p-4 mt-3">
				<div
					onClick={() => {
						this.props.deleteComp(this, "parcialOrina");
						this.props.changeData(4, {});
					}}
					className="delete-exam rounded-circle"
				>
					<i className="fas fa-minus"></i>
				</div>

				<Card.Header className="m-auto">
					<h5>Parcial Orina</h5>
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
									<Form.Label>Color:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										as="select"
										name="color"
										value={this.state.color}
										onChange={this.onChangeValues}
										required
									>
										<option>Default...</option>
										<option>AMARILLO</option>
										<option>ROJO</option>
									</FormControl>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Aspecto:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										name="aspecto"
										defaultValue="Default..."
										value={this.state.aspecto}
										onChange={this.onChangeValues}
										required
									/>
								</Col>
							</Row>
						</Form.Group>
						<hr />
						<Row>
							<Col>
								<h6>Examen Quimico</h6>
							</Col>
						</Row>
						<hr />

						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Densidad:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="densidad"
										value={this.state.densidad}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Nitritos:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="nitritos"
										value={this.state.nitritos}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>PH:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="ph"
										value={this.state.ph}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Esterasas:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="esterasas"
										value={this.state.esterasas}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Glucosa mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="glucosa"
										value={this.state.glucosa}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Proteina mg/dl:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="proteina"
										value={this.state.proteina}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Sangre:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="sangre"
										value={this.state.sangre}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<hr />
						<Row>
							<Col>
								<h6>Examen Microscopico</h6>
							</Col>
						</Row>
						<hr />

						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Celulas xcm:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="celulas"
										value={this.state.celulas}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Bacterias xcm:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="bacterias"
										value={this.state.bacterias}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="5">
									<Form.Label>Leucocitos xcm:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 2 }}>
									<FormControl
										type="text"
										name="leucocitos"
										value={this.state.leucocitos}
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

export default ParcialOrina;
