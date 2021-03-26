import React, { createRef } from "react";
import Cropologico from "./exams/coprologico";
import { Col, Row, Container, Form } from "react-bootstrap";
import "./styles.css";

class PdfGenerator extends React.Component {
	render() {
		return (
			<Container
				className="mt-5 p-0"
				fluid={true}
				ref={this.pdfContainer}
				style={{ maxWidth: "1400px", margin: 0 }}
			>

				<Row >
					<Col xs={{ span: 10, offset: 1 }}>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Nombre</Form.Label>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Documento</Form.Label>
								</Form.Group>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col xs={{ span: 10, offset: 1 }}>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Edad/sexo</Form.Label>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Fecha</Form.Label>
								</Form.Group>
							</Col>
						</Row>
					</Col>
				</Row>
				<Col md={{ span: 12 }} className="p-0">
					<Container className="div-container-pdf m-auto">
						<Cropologico />
					</Container>
				</Col>
			</Container>
		);
	}
}

export default PdfGenerator;
