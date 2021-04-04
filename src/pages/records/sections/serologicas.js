import React from "react";
import { Col, Row, Card, Form, FormControl } from "react-bootstrap";
import "../styles.css";

class Serologicas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			astos: "",
			factorReumateo: "",
			PCR: "",
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
			<Card className="p-4 mt-3">
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
								<Col md={{ span: 3, offset: 8 }}>
									<Row>
										<Form.Label className="m-auto">Resultados</Form.Label>
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
								<Col md={{ span: 4, offset: 3 }}>
									<Row>
										<Col>
											<FormControl
												type="text"
												name="astos"
												value={this.state.astos}
												onChange={this.onChangeValues}
											/>
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
								<Col md={{ span: 4, offset: 3 }}>
									<Row>
										<Col>
											<FormControl
												type="text"
												name="factorReumateo"
												value={this.state.factorReumateo}
												onChange={this.onChangeValues}
											/>
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
								<Col md={{ span: 4, offset: 3 }}>
									<Row>
										<Col>
											<FormControl
												type="text"
												name="PCR"
												value={this.state.PCR}
												onChange={this.onChangeValues}
											/>
										</Col>
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

export default Serologicas;
