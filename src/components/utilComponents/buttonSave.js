import React from "react";
import { Row, Col, Button } from "react-bootstrap";
class ButtonSave extends React.Component {
	render() {
		return (
			<Row className="buttonSave p-0 offset-2 col-8">
				<Col md={{ span: 3 }} className="d-flex justify-content-center p-0">
					<Button
						variant="dark"
						block
						onClick={() => {
							let option = window.confirm('¿Esta seguro de eliminar todo el formulario?')
							if(option ) this.props.clearState(false, false, true, "", []);
						}}
					>
						<i class="fas fa-times"></i>
					</Button>
				</Col>
				<Col
					md={{ span: 3, offset: 6 }}
					className="d-flex justify-content-center p-0"
				>
					<Button variant="dark" block onClick={()=> this.props.addRecord()}>
						<i class="fas fa-check"></i>
					</Button>
				</Col>
			</Row>
		);
	}
}

export default ButtonSave;
