import React from "react";

class Fields extends React.Component {
	render() {
		return (
			<tr>
				<td colSpan="2">{this.props.info.id}</td>
				<td style={{ paddingLeft: "30px" }}>
					{this.props.info.serologicas ? (
						<i className="fas fa-check"></i>
					) : (
						<i className="fas fa-times"></i>
					)}
				</td>
				<td style={{ paddingLeft: "30px" }}>
					{this.props.info.cuadroHematico ? (
						<i className="fas fa-check"></i>
					) : (
						<i className="fas fa-times"></i>
					)}
				</td>
				<td style={{ paddingLeft: "30px" }}>
					{this.props.info.coprologico ? (
						<i className="fas fa-check"></i>
					) : (
						<i className="fas fa-times"></i>
					)}
				</td>
				<td style={{ paddingLeft: "30px" }}>
					{this.props.info.parcialOrina ? (
						<i className="fas fa-check"></i>
					) : (
						<i className="fas fa-times"></i>
					)}
				</td>
				<td style={{ paddingLeft: "30px" }}>
					{this.props.info.quimicaSanguinea ? (
						<i className="fas fa-check"></i>
					) : (
						<i className="fas fa-times"></i>
					)}
				</td>
				<td>{this.props.info.date}</td>
				<td>{this.props.info.time}</td>

				<td style={{ paddingLeft: "30px" }}>
					<i className="fas fa-file-pdf"></i>
				</td>
			</tr>
		);
	}
}

export default Fields;
