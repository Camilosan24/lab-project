import React from "react";
import { Col, Table, Card } from "react-bootstrap";
import Field from "./field";
import axios from "axios";
import getAuth from "../../components/utilComponents/getAuth";

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fields: [],
		};
	}
	componentDidMount() {
		getAuth(this.props);
		axios
			.post("/api/customer/getcustomers")
			.then((res) => this.setState({ fields: res.data.customers }));
	}
	render() {
		return (
			<Col xs={{ span: 8, offset: 2 }} className="mt-5 pb-5">
				<Card className="p-5">
					<h2>Listado de Clientes</h2>
					<hr />

					<Card.Body>
						<Table striped bordered hover size="sm">
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
