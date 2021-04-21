import React from "react";
import {Card, Form, Button} from 'react-bootstrap'

class DeleteConfirmation extends React.Component {
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
									className="mt-3"
									onClick={this.props.onClickDelete}
								>
									Eliminar
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