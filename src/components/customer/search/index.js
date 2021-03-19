import React from "react";
import { Col, Form, FormControl, Card, Button, Table } from "react-bootstrap";
import Field from "./field";
import axios from "axios";
import getAuth from "../../utilComponents/getAuth";

class SearchCustomer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchInput: "",
			info: true,
			message: "",
		};
		this.info = {};
	}

	componentDidMount() {
		getAuth(this.props);
	}

	onClickSearch = () => {
		// axios
		// 	.post("/api/customer/addrecord", {cc: this.state.searchInput})
		// 	.then((res) => {
		// 		console.log(res.data);
		// 	});
	};

	handleInputOnChange = (e) => {
		this.setState({ searchInput: e.target.value });
	};
	render() {
		return (
			<>
				<Col xs={{ span: 4 }} className="p-5 pb-5">
					<Card>
						<Card.Header>
							<h2>Buscar Registros</h2>
						</Card.Header>
						<Card.Body>
							<Form>
								<Form.Group>
									<Form.Label>
										Cedula de Ciudadania: <span className="text-danger">*</span>
									</Form.Label>
									<FormControl
										type="text"
										name="name"
										onChange={this.handleInputOnChange}
										value={this.state.searchInput}
										required
									/>
									<Form.Text className="text-danger">
										{this.state.message}
									</Form.Text>
								</Form.Group>
								<Form.Group>
									<Button onClick={this.onClickSearch} block>
										Buscar
									</Button>
								</Form.Group>
							</Form>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={{ span: 7 }} className="mt-5">
					<Table striped bordered hover size="sm" variant="light">
						<thead>
							<tr className="bg-info">
								<th>#</th>
								<th>Cedula</th>
								<th>Nombre</th>
								<th>Fecha</th>
								<th>Archivo</th>
							</tr>
						</thead>
						<tbody>
							{/* {this.state.info
								? this.info.map((info, index) => (
										<Field info={info} key={index} number={index} />
								  ))
								: null} */}
						</tbody>
					</Table>
				</Col>
			</>
		);
	}
}

export default SearchCustomer;
