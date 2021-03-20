import React from "react";
import { Col, Row, Card, Form, FormControl } from "react-bootstrap";
import "../styles.css";

class Serologicas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			res_astos: 0,
			res_factorReumatoideo: 0,
			res_PCR: 0,
			met_astos: 0,
			met_factorReumatoideo: 0,
			met_PCR: 0,
		};
	}

	onChangeValues = (e) => {
		let inputName = e.target;
		this.setState({ [inputName.name]: inputName.value }, () => {
			this.props.changeData(1, this.state);
		});
	};
	render() {
		return (
			<Row className="mt-3">
				<Card className="p-4 col-6 offset-3">
					<div
						onClick={() => {
							this.props.deleteComp(this, "serologicas");
							this.props.changeData(1, {});
						}}
						className="delete-exam rounded-circle"
						width="20"
						height="20"
						alt=""
					>
						<i class="fas fa-minus"></i>
					</div>

					<Card.Header className="m-auto">
						<h5>Pruebas Serologicas</h5>
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
											<Form.Label className="m-auto">Metodo</Form.Label>
										</Row>
									</Col>
								</Row>
							</Form.Group>
							<Form.Group>
								<Row>
									<Col md="4">
										<Row>
											<Col>
												<Form.Label>Astos:</Form.Label>
											</Col>
										</Row>
									</Col>
									<Col md="3">
										<Row>
											<Col>
												<FormControl
													type="text"
													name="res_astos"
													value={this.state.res_astos}
													onChange={this.onChangeValues}
												/>
											</Col>
										</Row>
									</Col>
									<Col md="5">
										<Row>
											<Col>
												<Form.Control
													as="select"
													name="met_astos"
													defaultValue="Default..."
													value={this.state.met_astos}
													onChange={this.onChangeValues}
													required
												>
													<option>Default...</option>
													<option>Aglutinación por latex</option>
												</Form.Control>
											</Col>
										</Row>
									</Col>
								</Row>
							</Form.Group>
							<Form.Group>
								<Row>
									<Col md="4">
										<Row>
											<Col>
												<Form.Label>Factor Reumatoideo:</Form.Label>
											</Col>
										</Row>
									</Col>
									<Col md="3">
										<Row>
											<Col>
												<FormControl
													type="text"
													name="res_factorReumatoideo"
													value={this.state.res_factorReumatoideo}
													onChange={this.onChangeValues}
												/>
											</Col>
										</Row>
									</Col>
									<Col md="5">
										<Row>
											<Col>
												<Form.Control
													as="select"
													name="met_factorReumatoideo"
													defaultValue="Default..."
													value={this.state.met_factorReumatoideo}
													onChange={this.onChangeValues}
													required
												>
													<option>Default...</option>
													<option>Aglutinación por latex</option>
												</Form.Control>
											</Col>
										</Row>
									</Col>
								</Row>
							</Form.Group>
							<Form.Group>
								<Row>
									<Col md="4">
										<Row>
											<Col>
												<Form.Label>PCR:</Form.Label>
											</Col>
										</Row>
									</Col>
									<Col md="3">
										<Row>
											<Col>
												<FormControl
													type="text"
													name="res_PCR"
													value={this.state.res_PCR}
													onChange={this.onChangeValues}
												/>
											</Col>
										</Row>
									</Col>
									<Col md="5">
										<Row>
											<Col>
												<Form.Control
													as="select"
													name="met_PCR"
													defaultValue="Default..."
													value={this.state.met_PCR}
													onChange={this.onChangeValues}
													required
												>
													<option>Default...</option>
													<option>Aglutinación por latex</option>
												</Form.Control>
											</Col>
										</Row>
									</Col>
								</Row>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
			</Row>
		);
	}
}

export default Serologicas;
