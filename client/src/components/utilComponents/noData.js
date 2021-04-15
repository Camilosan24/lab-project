import React from "react";
import {Col, Row, Form} from 'react-bootstrap'

class NoData extends React.Component {
	render() {
		return (
			<tr>
				<td colSpan={this.props.cols}>
					<Row className="p-5 m-0">
						<Col xs={{ span: 10, offset: 1 }}  className="d-flex">
							<Form.Label className="m-auto">
								<h2>No existen datos</h2>
							</Form.Label>
						</Col>
					</Row>
				</td>
			</tr>
		);
	}
}

export default NoData;
