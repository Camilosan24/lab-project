import React from "react";
import {
	Col,
	Form,
	Row,
	FormControl,
	Card,
	Button,
	Table,
} from "react-bootstrap";
import Data from "./data";
import Icon from "../../../icons/pdf.svg";
import axios from "axios";

class SearchCustomer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchInput: "",
			info: null,
			message: "",
		};
		this.info = [
			{
				cc: 10058592225,
				name: "Camilo sanchez",
				date: "24/10/2001",
				icon: Icon,
			},
			{
				cc: 10058592225,
				name: "daniel sanchez",
				date: "24/10/2001",
				icon: Icon,
			},
			{
				cc: 10058592225,
				name: "hello sanchez",
				date: "24/10/2001",
				icon: Icon,
			},
		];
	}

	onClickSearch = (e) => {
		e.preventDefault()
		let searchInput = this.state.searchInput;
		if (searchInput.length >= 8 && searchInput.length <= 10) {
			return axios
				.get(`/getRecords/${this.state.searchInput}`)
				.then((res) => this.setState({ info: res }));
		}
	};

	handleInputOnChange = (e) => {
		this.setState({ searchInput: e.target.value });
	};
	render() {
		return (
			<>
				<Col xs={{ span: 4 }} className="p-5">
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
									<Button onClick={this.onClickSearch} block>Buscar</Button>
								</Form.Group>
							</Form>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={{ span: 7 }} className="mt-5">
					<Table striped bordered hover size="sm">
						<thead>
							<tr>
								<th>#</th>
								<th>Cedula</th>
								<th>Nombre</th>
								<th>Fecha</th>
								<th>Archivo</th>
							</tr>
						</thead>
						<tbody>
							{this.state.info
								? this.info.map((info, index) => (
										<Data info={info} key={index} number={index} />
								  ))
								: null}
						</tbody>
					</Table>
				</Col>
			</>
		);
	}
}

export default SearchCustomer;
