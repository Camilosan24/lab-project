import React from "react";
import { Col, Row, Card, Form, FormControl } from "react-bootstrap";
import "../styles.css";

class CuadroHematico extends React.Component {
	state = {
		hematocrito: 0,
		hemoglobina: 0,
		leucocitos: 0,
		neutrofilos: 0,
		linfocitos: 0,
		plaquetas: 0,
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
					<i class="fas fa-minus"></i>
				</div>

				<Card.Header className="m-auto">
					<h5>Cuadro Hematico</h5>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={this.handleOnSubmit}>
						<Form.Group>
							<Row>
								<Col md={{ span: 3, offset: 4 }}>
									<Row>
										<Form.Label className="m-auto">Resultados</Form.Label>
									</Row>
								</Col>
								<Col md="5">
									<Row>
										<Form.Label className="m-auto">Valor Normal</Form.Label>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col md={{ span: 5, offset: 7 }}>
									<Row>
										<Col className="">
											<Row>
												<Form.Label className="m-auto text-muted">
													Hombres
												</Form.Label>
											</Row>
										</Col>
										<Col>
											<Row>
												<Form.Label className="m-auto text-muted">
													Mujeres
												</Form.Label>
											</Row>
										</Col>
									</Row>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Hematocrito %:</Form.Label>
								</Col>

								<Col md="3">
									<FormControl
										type="text"
										name="hematocrito"
										value={this.state.hematocrito}
										onChange={this.onChangeValues}
									/>
								</Col>
								<Col md="5">
									<Row>
										<Col>
											<Row>
												<Form.Label className="m-auto text-muted">
													40 - 54
												</Form.Label>
											</Row>
										</Col>
										<Col>
											<Row>
												<Form.Label className="m-auto text-muted">
													38 - 47
												</Form.Label>
											</Row>
										</Col>
									</Row>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Hemoglobina g%:</Form.Label>
								</Col>
								<Col md="3">
									<FormControl
										type="text"
										name="hemoglobina"
										value={this.state.hemoglobina}
										onChange={this.onChangeValues}
									/>
								</Col>
								<Col md="5">
									<Row>
										<Col>
											<Row>
												<Form.Label className="m-auto text-muted">
													13,5 - 18
												</Form.Label>
											</Row>
										</Col>
										<Col>
											<Row>
												<Form.Label className="m-auto text-muted">
													12 - 16
												</Form.Label>
											</Row>
										</Col>
									</Row>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Recuento de Leucocitos:</Form.Label>
								</Col>
								<Col md="3">
									<FormControl
										type="text"
										name="leucocitos"
										value={this.state.leucocitos}
										onChange={this.onChangeValues}
									/>
								</Col>
								<Col md="5">
									<Row>
										<Col>
											<Row>
												<Form.Label className="m-auto text-muted">
													4.500 - 11.000
												</Form.Label>
											</Row>
										</Col>
									</Row>
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
								<Col md="3">
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
								<Col md="3">
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
								<Col md="3">
									<FormControl
										type="text"
										name="plaquetas"
										value={this.state.plaquetas}
										onChange={this.onChangeValues}
									/>
								</Col>
								<Col md="5">
									<Row>
										<Form.Label className="m-auto text-muted">
											150.00 - 450.000
										</Form.Label>
									</Row>
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
