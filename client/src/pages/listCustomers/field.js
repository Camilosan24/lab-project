import React from "react";
import { Button } from "react-bootstrap";

class Field extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.number}</td>
				<td>{this.props.info.cc}</td>
				<td>{this.props.info.name}</td>
				<td>{this.props.info.lastname}</td>
				<td>{this.props.info.email}</td>
				<td>{this.props.info.direction}</td>
				<td>{this.props.info.birthdate}</td>
				<td>{this.props.info.age}</td>
				<td className="d-flex justify-content-center">
					<Button
					className="trash-button"
						variant="danger"
						onClick={() => {
							this.props.tempDeleteCustomer(this.props.info.cc);
						}}
					>
						<i className="fas fa-trash"></i>
					</Button>
				</td>
			</tr>
		);
	}
}

export default Field;
