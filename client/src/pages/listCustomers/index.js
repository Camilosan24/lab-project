import React from "react";
import { Col, Table, Card } from "react-bootstrap";
import Field from "./field";
import requests from "../../components/utilComponents/requests";
import NoData from "../../components/utilComponents/noData";
// import getAuth from "../../components/utilComponents/getAuth";

class List extends React.Component {
	constructor(props) {
		super(props);
		this.requests = requests();
		this.state = {
			fields: [],
		};
	}
	async componentDidMount() {
		// let response = await requests().auth(this.props);
		// if (response) {
			this.requests.getCustomers().then((res) => {
				if (res.data.customers.length > 0)
					return this.setState({ fields: res.data.customers });
				return this.setState({ fields: null });
			});
		// }
	}
	render() {
		return (
			<Col md={{ span: 10, offset: 1 }} xs={{ span: 12 }} className="mt-5 pb-5">
				<Card className="p-md-3 p-2">
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
									<th>Correo</th>
									<th>Direccion</th>
									<th>Fecha de nacimiento</th>
									<th>Edad</th>
								</tr>
							</thead>
							<tbody>
								{this.state.fields !== null ? (
									this.state.fields.map((info, index) => (
										<Field info={info} key={index} number={index + 1} />
									))
								) : (
									<NoData cols="7" />
								)}
							</tbody>
						</Table>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}

export default List;
