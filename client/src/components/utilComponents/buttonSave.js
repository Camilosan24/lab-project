import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "./spinner";
class ButtonSave extends React.Component {
	state = {
		loading: false,
	};

	sendData = async () => {
		this.props.disableAllFields();
		this.setState({ loading: !this.state.loading });
		await this.props.addRecord();
		this.setState({ loading: !this.state.loading });
	};

	generateAlert = (e) => {
		let option;
		if (e.target.name === "delete") {
			option = window.confirm("¿Esta seguro de eliminar todo el formulario?");
			if (option) this.props.clearState(false, false, true, "", []);
		} else if (e.target.name === "send") {
			option = window.confirm("¿Esta seguro de crear el registro?");
			if (option) {
				this.sendData();
			}
		}
	};
	render() {
		return (
			<Row className="">
				<Col
					xs={{ span: 5 }}
					md={{ span: 3 }}
					className="d-flex justify-content-center"
				>
					<Button
						name="delete"
						variant="dark"
						disabled={this.props.sendingInfoDisabled}
						onClick={this.generateAlert}
						block
					>
						<i className="fas fa-times"></i>
					</Button>
				</Col>
				<Col
					xs={{ span: 5, offset: 2 }}
					md={{ span: 3, offset: 6 }}
					className="d-flex justify-content-center"
				>
					<Button
						name="send"
						variant="dark"
						onClick={this.generateAlert}
						disabled={this.props.sendingInfoDisabled}
						block
					>
						{!this.state.loading ? (
							<i className="fas fa-check"></i>
						) : (
							<Spinner variant="success" />
						)}
					</Button>
				</Col>
			</Row>
		);
	}
}

export default ButtonSave;
