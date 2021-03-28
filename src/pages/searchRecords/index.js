import React from "react";
import requests from "../../components/utilComponents/requests";
import { Col, Row, Form, Card, Table, FormLabel } from "react-bootstrap";
import "./styles.css";
import Field from "../../components/utilComponents/field";
import NoData from "../../components/utilComponents/noData";

class SearchCustomer extends React.Component {
	constructor(props) {
		super(props);
		this.requests = requests();
		this.state = {
			searchInput: "",
			infoFields: [],
			name: "",
			message: "",
		};
	}

	componentDidMount() {
		// return getAuth(this.props);
	}

	getCustomer = () => {
		this.requests.getCustomerByCc(this.state.searchInput).then((res) => {
			if (res.data.success) {
				this.setState({
					name: `${res.data.customer.name} ${res.data.customer.lastname}`,
				});
				if (res.data.records.length === 0) {
					this.setState({ infoFields: null });
				} else {
					this.setState({ infoFields: res.data.customer.records });
				}
			} else {
				this.setState({ message: res.data.message });
			}
		});
	};

	handleInputOnChange = (e) => {
		this.setState({ searchInput: e.target.value }, () => {
			if (this.state.searchInput.length === 10) {
				this.getCustomer();
			} else {
				this.setState({ name: "", infoFields: [], message: "" });
			}
		});
	};
	render() {
		return (
			<Col md={{ span: 8, offset: 2 }} xs={{ span: 12 }} className="mt-5">
				<Card className="p-2 p-md-4">
					<h2>Buscar Registros</h2>
					<hr />
					<Card.Body>
						<Row>
							<Col md={{ span: 4, offset: 8 }}>
								<Form.Group className="d-flex mt-3">
									<i className="fas fa-search icon"></i>
									<Form.Control
										type="text"
										placeholder="Buscar"
										onChange={this.handleInputOnChange}
										value={this.state.searchInput}
										autoComplete="off"
										maxLength="10"
										className="icon-input"
										ref={this.password}
									></Form.Control>
								</Form.Group>
								<Form.Group>
									<Row>
										<Form.Label className="text-danger m-auto">
											{this.state.message}
										</Form.Label>
									</Row>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<FormLabel
								className="m-auto align-text-center"
								style={{ textAlign: "center" }}
							>
								<h3>{this.state.name}</h3>
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
