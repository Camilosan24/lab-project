import React from "react";
import axios from "axios";
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

class SearchCustomer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchInput: "",
			infoFields: [],
			name: "",
		};
	}

	handleInputOnChange = (e) => {
		this.setState({ searchInput: e.target.value }, () => {
			if (this.state.searchInput.length === 10) {
				axios
					.get(`/api/customer/getrecords/${this.state.searchInput}`)
					.then((res) => {
						console.log(res);
						if (res.data) this.setState({ infoFields: res.data.customer.records, name: `${res.data.customer.name} ${res.data.customer.lastname}` });
					});
			}
		});
	};
	render() {
		return (
			<Col md={{ span: 10, offset:1 }} className="mt-5">
				<Row>
					<Card className="p-4 col-12">
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
								<FormLabel className="m-auto">
									<h2>{this.state.name}</h2>
									<hr/>
								</FormLabel>
							</Row>
							<Row>
								<Col>
									<Table>
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
				</Row>
			</Col>
		);
	}
}

export default SearchCustomer;
