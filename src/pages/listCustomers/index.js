import React from "react";
import { Col, Table, Card } from "react-bootstrap";
import Field from "./field";
import requests from "../../components/utilComponents/requests";
// import getAuth from "../../components/utilComponents/getAuth";

class List extends React.Component {
	constructor(props) {
		super(props);
		this.requests = requests();
		this.state = {
			fields: [],
		};
	}
	componentDidMount() {
		// return getAuth(this.props);
		this.requests
			.getCustomers()
			.then((res) => this.setState({ fields: res.data.customers }));
	}
	render() {
		return (
			<Col md={{ span: 8, offset: 2 }} xs={{ span: 12 }} className="mt-5 pb-5">
				<Card className="p-md-5 p-2">
					<h2>Listado de Clientes</h2>
					<hr />
					<Card.Body className="p-1 p-md-2">
						<Table striped bordered hover size="lg" responsive={true}>
							<thead>
								<tr>
									<th>#</th>
									<th>Cedula</th>
									<th>Nombres</th>
									<th>Apellidos</th>
									<th>Direccion</th>
									<th>Fecha de nacimiento</th>
									<th>Edad</th>
								</tr>
							</thead>
							<tbody>
								{this.state.fields
									? this.state.fields.map((info, index) => (
											<Field info={info} key={index} number={index + 1} />
									  ))
									: null}
							</tbody>
						</Table>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}

export default List;
