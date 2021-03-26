import React from "react";
import "./stylesToExams.css";
import { Col, Row, Form } from "react-bootstrap";

class Cropologico extends React.Component {
	render() {
		return (
			<Row className="p-3">
				<Col className="p-0">
					<Row>
						<Form.Label className="m-auto">
							<h5 className="text-align-center">COPROLOGICO</h5>
						</Form.Label>
					</Row>
					<h6>EXAMEN FISICO</h6>
					<table style={{ width: "100%" }}>
						<tbody>
							<tr>
								<td style={{ width: "25%" }}>COLOR</td>
								<td style={{ width: "25%" }}></td>
								<td style={{ width: "25%" }}>CONSISTENCIA</td>
								<td style={{ width: "25%" }}></td>
							</tr>
							<th>EXAMEN MICROCOSPICO</th>
							<tr style={{ background: "rgb(171, 173, 171)" }}>
								<td>LEUCOCITOS XCM</td>
								<td></td>
								<td>FLORA BACTERIANA</td>
								<td></td>
							</tr>
							<tr style={{ background: "rgb(171, 173, 171)" }}>
								<td>ALMIDON</td>
								<td></td>
								<td>CELILOSA</td>
								<td></td>
							</tr>
							<tr>
								<td>PARASITOS</td>
								<td colSpan="3"></td>
							</tr>
						</tbody>
					</table>
				</Col>
			</Row>
		);
	}
}

export default Cropologico;
