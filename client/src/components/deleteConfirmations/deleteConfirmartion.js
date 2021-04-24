import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import SpinnerComponent from "../utilComponents/spinner";

class DeleteConfirmation extends React.Component {
	state = {
		loading: false,
	};
	render() {
		return (
			<div id="confirmationToDelete">
				<div className="mt-5 card-confirmation">
					<Card className=" justify-content-center">
						<Card.Header>
							Escriba <i className="text-muted">confirmar</i> para eliminar el
							cliente
						</Card.Header>
						<Card.Body className="d-flex flex-column">
							<Form.Control
								type="text"
								onChange={this.props.handleOnChange}
								value={this.props.componentState.deleteCustomerInput}
							/>
							<div className="d-flex justify-content-end confirmation-buttons">
								<Button
									variant="light"
									className="mt-3 mr-3"
									onClick={() => this.props.tempDeleteCustomer()}
								>
									Cancelar
								</Button>
								<Button
									variant="danger"
									disabled={this.props.componentState.deleteCustomerButton}
									className={`mt-3 ${
										this.state.loading && "buttonConfirmation"
									}`}
									onClick={() => {
										this.setState({ loading: true });
										this.props.onClickDelete();
									}}
								>
									{this.state.loading ? <SpinnerComponent /> : "Eliminar"}
								</Button>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		);
	}
}

export default DeleteConfirmation;
