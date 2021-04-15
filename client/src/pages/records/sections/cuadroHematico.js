import React from "react";
import { Col, Row, Card, Form, FormControl } from "react-bootstrap";
import "../styles.css";

class CuadroHematico extends React.Component {
	state = {
		hematocrito: "",
		hemoglobina: "",
		leucocitos: "",
		neutrofilos: "",
		linfocitos: "",
		recuentoPlaquetas: "",
		VSG: "",
		frotisSangrePerisferica: '',
		globulosRojos: '',
		globulosBlancos: '',
		plaquetas: '',
	};
	onChangeValues = (e) => {
		let inputName = e.target;
		this.setState({ [inputName.name]: inputName.value }, () => {
			this.props.changeData(2, this.state);
		});
	};
	render() {
		return (
			<Card className="p-4 mt-3">
				<div
					onClick={() => {
						this.props.deleteComp(this, "cuadroHematico");
						this.props.changeData(2, {});
					}}
					className="delete-exam rounded-circle"
				>
					<i className="fas fa-minus"></i>
				</div>

				<Card.Header className="m-auto">
					<h5>Cuadro Hematico</h5>
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
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Hematocrito %:</Form.Label>
								</Col>

								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="hematocrito"
										value={this.state.hematocrito}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Hemoglobina g%:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="hemoglobina"
										value={this.state.hemoglobina}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Recuento de Leucocitos:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="leucocitos"
										value={this.state.leucocitos}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<hr />

						<Row>
							<Col>
								<h6>Recuento Diferencial</h6>
							</Col>
						</Row>

						<hr />
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Neutrofilos:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="neutrofilos"
										value={this.state.neutrofilos}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Linfocitos:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="linfocitos"
										value={this.state.linfocitos}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Recuento de Plaquetas:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="recuentoPlaquetas"
										value={this.state.recuentoPlaquetas}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>VSG mm A LA HORA:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="VSG"
										value={this.state.VSG}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<hr/>
						<Form.Group>
							<Row className="mt-3">
								<Col md={{ span: 6, offset: 0 }}>
									<Form.Label>Frotis de sangre perifericas:</Form.Label>
								</Col>
								<Col md={{ span: 6, offset:0 }}>
									<FormControl
										as="textarea"
										rows={2}
										type="textarea"
										name="frotisSangrePerisferica"
										value={this.state.frotisSangrePerisferica}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<hr/>
						<Form.Group>
							<Row className="mt-3">
								<Col md={{ span: 6, offset: 0 }}>
									<Form.Label>Globulos Rojos:</Form.Label>
								</Col>
								<Col md={{ span: 6, offset:0 }}>
									<FormControl
										as="textarea"
										rows={2}
										type="textarea"
										name="globulosRojos"
										value={this.state.globulosRojos}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<hr/>
						<Form.Group>
							<Row className="mt-3">
								<Col md={{ span: 6, offset: 0 }}>
									<Form.Label>Globulos Blancos:</Form.Label>
								</Col>
								<Col md={{ span: 6, offset:0 }}>
									<FormControl
										as="textarea"
										rows={2}
										type="textarea"
										name="globulosBlancos"
										value={this.state.globulosBlancos}
										onChange={this.onChangeValues}
									/>
								</Col>
							</Row>
						</Form.Group>
						<hr/>
						<Form.Group>
							<Row className="mt-3">
								<Col md={{ span: 6, offset: 0 }}>
									<Form.Label>Plaquetas:</Form.Label>
								</Col>
								<Col md={{ span: 6, offset:0 }}>
									<FormControl
										as="textarea"
										rows={2}
										type="textarea"
										name="plaquetas"
										value={this.state.plaquetas}
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

export default CuadroHematico;
