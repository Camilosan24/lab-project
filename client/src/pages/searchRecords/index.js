import React from "react";
import requests from "../../components/utilComponents/requests";
import {
	Col,
	Row,
	Form,
	Card,
	Table,
	FormLabel,
	Button,
	InputGroup,
} from "react-bootstrap";
import "./styles.css";
import Field from "../../components/utilComponents/field";
import NoData from "../../components/utilComponents/noData";
import SpinnerComponent from "../../components/utilComponents/spinner";

class SearchCustomer extends React.Component {
	constructor(props) {
		super(props);
		this.requests = requests();
		this.state = {
			searchInput: "",
			infoFields: [],
			name: "",
			message: "",
			loading: false
		};
	}

	// async componentDidMount() {
	// 	return await requests().auth(this.props);
	// }

	getCustomer = () => {
		this.requests.getCustomerByCc(this.state.searchInput).then((res) => {
			this.setState({loading: false});
			if (res.data.success) {
				this.setState({
					name: `${res.data.customer.name} ${res.data.customer.lastname}`,
					message: "",
				});
				if (res.data.records.length === 0) {
					this.setState({ infoFields: null });
				} else {
					this.setState({ infoFields: res.data.customer.records });
				}
			} else {
				this.setState({
					message: res.data.message,
					infoFields: [],
					name: "",
					searchInput: "",
				});
				setTimeout(() => {
					this.setState({ message: "" });
				}, 2000);
			}
		});
	};

	handleInputOnChange = (e) => {
		if (e.target.value === "") {
			this.setState({
				searchInput: e.target.value,
				name: "",
				infoFields: [],
				message: "",
			});
		}
		if (!Number(e.target.value)) {
			return;
		}
		this.setState({ searchInput: e.target.value });
	};
	onClickSearch = () => {
		this.setState({loading: true});
		this.getCustomer();
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
								<InputGroup className="d-flex mt-3">
									<Form.Control
										type="text"
										placeholder="Buscar"
										onChange={this.handleInputOnChange}
										value={this.state.searchInput}
										autoComplete="off"
										maxLength="10"
										ref={this.password}
									></Form.Control>
									<InputGroup.Prepend>
										<Button variant="secondary" onClick={this.onClickSearch} class="search-section">
											{this.state.loading ? <SpinnerComponent/>:<i className="fas fa-search"></i>}
										</Button>
									</InputGroup.Prepend>
								</InputGroup>
								<Form.Group className="pt-1">
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
												<Field
													info={info}
													key={index}
													number={index}
													openPdf={this.openPdf}
												/>
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
