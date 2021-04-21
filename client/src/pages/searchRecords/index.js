import React from "react";

import { Col, Row, Card, Table, FormLabel } from "react-bootstrap";
import "./styles.css";
import Field from "../../components/utilComponents/field";
import NoData from "../../components/utilComponents/noData";
import InputSearchCustomer from "../../components/inputSearchCustomer/inputSearchCustomer";

class SearchCustomer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			infoFields: [],
			completeName: "",
		};
	}

	// async componentDidMount() {
	// 	return await requests().auth(this.props);
	// }

	editCustomerData = (data) => {
		if (data !== null) {
			this.setState({
				completeName: `${data.customer.name} ${data.customer.lastname}`,
			});
			if (data.records.length === 0) {
				return this.setState({ infoFields: null });
			}
			this.setState({ infoFields: data.records });
		}
	};

	render() {
		return (
			<Col md={{ span: 8, offset: 2 }} xs={{ span: 12 }} className="mt-5">
				<Card className="p-2 p-md-4">
					<h2>Buscar Registros</h2>
					<hr />
					<Card.Body>
						<InputSearchCustomer editCustomerData={this.editCustomerData} />
						<Row>
							<FormLabel
								className="m-auto align-text-center"
								style={{ textAlign: "center" }}
							>
								<h3>{this.state.completeName}</h3>
								<hr />
							</FormLabel>
						</Row>
						<Row>
							<Col>
								<Table striped bordered hover size="lg" responsive={true}>
									<thead>
										<tr>
											<th colSpan="2">ID</th>
											<th>Serologia</th>
											<th>C. Hematico</th>
											<th>Coprologico</th>
											<th>P. Orina</th>
											<th>Q. Sanquinea</th>
											<th>Fecha</th>
											<th>Hora</th>
											<th>Archivo</th>
										</tr>
									</thead>
									<tbody>
										{this.state.infoFields == null ? (
											<NoData cols="10" />
										) : (
											this.state.infoFields &&
											this.state.infoFields.map((info, index) => (
												<Field info={info} key={index} number={index} />
											))
										)}
									</tbody>
								</Table>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}

export default SearchCustomer;
