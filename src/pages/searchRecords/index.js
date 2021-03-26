import React from "react";
import requests from "../../components/utilComponents/requests";
import {
	Col,
	Row,
	Form,
	FormControl,
	Card,
	Table,
	InputGroup,
	FormLabel,
} from "react-bootstrap";
import "./styles.css";
import Field from "../../components/utilComponents/field";
// import getAuth from "../../components/utilComponents/getAuth";

class SearchCustomer extends React.Component {
	constructor(props) {
		super(props);
		this.requests = requests();
		this.state = {
			searchInput: "",
			infoFields: [],
			name: "",
		};
	}

	componentDidMount() {
		// return getAuth(this.props);
	}

	getCustomer = () => {
		this.requests.getCustomerByCc(this.state.searchInput).then((res) => {
			if (res.data.customer)
				this.setState({
					infoFields: res.data.customer.records,
					name: `${res.data.customer.name} ${res.data.customer.lastname}`,
				});
		});
	};

	handleInputOnChange = (e) => {
		this.setState({ searchInput: e.target.value }, () => {
			if (this.state.searchInput.length === 10) {
				this.getCustomer();
			} else {
				this.setState({ name: "", infoFields: [] });
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
								<Form.Group className="form-inputGroup">
									<InputGroup>
										<InputGroup.Text
											style={{ background: "none", border: "none" }}
										>
											<i className="fas fa-search"></i>
										</InputGroup.Text>

										<FormControl
											type="text"
											placeholder="Buscar"
											onChange={this.handleInputOnChange}
											value={this.state.searchInput}
											className="searchInput"
										/>
									</InputGroup>
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
											<th>FECHA</th>
											<th>HORA</th>
											<th>ARCHIVO</th>
										</tr>
									</thead>
									<tbody>
										{this.state.infoFields &&
											this.state.infoFields.map((info, index) => (
												<Field info={info} key={index} number={index} />
											))}
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
