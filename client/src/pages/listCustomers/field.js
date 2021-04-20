import React from "react";

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
			</tr>
		);
	}
}

export default Field;
