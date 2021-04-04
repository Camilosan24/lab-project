import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "./spinner";
class ButtonSave extends React.Component {
	state = {
		loading: false,
	};

	sendData = async () => {
		this.setState({ loading: !this.state.loading });
		await this.props.addRecord();
		this.setState({ loading: !this.state.loading });
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
						variant="dark"
						block
						onClick={() => {
							let option = window.confirm(
								"¿Esta seguro de eliminar todo el formulario?"
							);
							if (option) this.props.clearState(false, false, true, "", []);
						}}
					>
						<i className="fas fa-times"></i>
					</Button>
				</Col>
				<Col
					xs={{ span: 5, offset: 2 }}
					md={{ span: 3, offset: 6 }}
					className="d-flex justify-content-center"
				>
					<Button variant="dark" block onClick={this.sendData}>
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
