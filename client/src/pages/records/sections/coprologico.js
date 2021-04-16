import React from "react";
import { Col, Row, Card, Form, FormControl } from "react-bootstrap";
import "../styles.css";

class Coprologico extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: "",
			consistencia: "",
			leucocitos: "",
			almidon: "",
			floraBacteriana: "",
			celulosa: "",
			parasitos: "",
		};
	}

	onChangeValues = (e) => {
		let inputName = e.target;
		this.setState({ [inputName.name]: inputName.value }, () => {
			this.props.changeData(3, this.state);
		});
	};
	render() {
		return (
			<Card className="p-4 mt-3">
				<div
					onClick={() => {
						this.props.deleteComp(this, "coprologico");
						this.props.changeData(3, {});
					}}
					className="delete-exam rounded-circle"
				>
					<i className="fas fa-minus"></i>
				</div>

				<Card.Header className="m-auto">
					<h5>Coprologico</h5>
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
								<Col md="4">
									<Form.Label>Color:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										as="select"
										name="color"
										value={this.state.color}
										onChange={this.onChangeValues}
										required
										disabled={this.props.sendingInfoDisabled}
									>
										<option defaultValue="Default...">Default...</option>
										<option defaultValue="AMARILLO">AMARILLO</option>
										<option defaultValue="ROJO">ROJO</option>
									</FormControl>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Consistencia:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										name="consistencia"
										value={this.state.consistencia}
										onChange={this.onChangeValues}
										required
										disabled={this.props.sendingInfoDisabled}
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
								<Col md="4">
									<Form.Label>Leucocitos XCM:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="leucocitos"
										value={this.state.leucocitos}
										onChange={this.onChangeValues}
										disabled={this.props.sendingInfoDisabled}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Almidon:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="almidon"
										value={this.state.almidon}
										onChange={this.onChangeValues}
										disabled={this.props.sendingInfoDisabled}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Flora Bacteriana:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="floraBacteriana"
										value={this.state.floraBacteriana}
										onChange={this.onChangeValues}
										disabled={this.props.sendingInfoDisabled}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Celulosa:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="celulosa"
										value={this.state.celulosa}
										onChange={this.onChangeValues}
										disabled={this.props.sendingInfoDisabled}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col md="4">
									<Form.Label>Parasitos:</Form.Label>
								</Col>
								<Col md={{ span: 4, offset: 3 }}>
									<FormControl
										type="text"
										name="parasitos"
										value={this.state.parasitos}
										onChange={this.onChangeValues}
										disabled={this.props.sendingInfoDisabled}
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

export default Coprologico;
