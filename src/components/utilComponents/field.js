import React from "react";

class Fields extends React.Component {
	render() {
		return (
			<tr>
				<td colSpan="2">{this.props.info.id}</td>
				<td style={{ paddingLeft: "30px" }}>
					{this.props.info.serologicas ? (
						<i class="fas fa-check"></i>
					) : (
						<i class="fas fa-times"></i>
					)}
				</td>
				<td style={{ paddingLeft: "30px" }}>
					{this.props.info.cuadroHematico ? (
						<i class="fas fa-check"></i>
					) : (
						<i class="fas fa-times"></i>
					)}
				</td>
				<td style={{ paddingLeft: "30px" }}>
					{this.props.info.coprologico ? (
						<i class="fas fa-check"></i>
					) : (
						<i class="fas fa-times"></i>
					)}
				</td>
				<td style={{ paddingLeft: "30px" }}>
					{this.props.info.parcialOrina ? (
						<i class="fas fa-check"></i>
					) : (
						<i class="fas fa-times"></i>
					)}
				</td>
				<td style={{ paddingLeft: "30px" }}>
					{this.props.info.quimicaSanguinea ? (
						<i class="fas fa-check"></i>
					) : (
						<i class="fas fa-times"></i>
					)}
				</td>
				<td>{this.props.info.date}</td>
				<td>{this.props.info.time}</td>

				<td style={{ paddingLeft: "30px" }}>
					<i class="fas fa-file-pdf"></i>
				</td>
			</tr>
		);
	}
}

export default Fields;
