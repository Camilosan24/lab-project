import React from "react";
import { Button, InputGroup, Row, Col, Form } from "react-bootstrap";
import requests from "../utilComponents/requests";
import SpinnerComponent from "../utilComponents/spinner";
class InputSearchCustomer extends React.Component {
	constructor(props) {
		super(props);
		this.requests = requests();
		this.state = {
			searchInput: "",
			name: "",
			message: "",
			loading: false,
		};
	}

	getCustomer = () => {
		if (this.state.searchInput !== "") {
			return this.requests
				.getCustomerByCc(this.state.searchInput)
				.then((res) => {
					this.setState({ loading: false });
					if (res.data.success) {
                  this.props.editCustomerData(res.data)
					} else {
						this.setState({
							message: res.data.message,
							searchInput: "",
						});
						setTimeout(() => {
							this.setState({ message: "" });
						}, 2000);
					}
				});
		}
		this.setState({ message: "¡Campo vacio!", loading: false });
      this.props.editCustomerData(null)
		return setTimeout(() => {
			this.setState({ message: "" });
		}, 1000);
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
		this.setState({ loading: true });
		this.getCustomer();
	};

	render() {
		return (
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
						></Form.Control>
						<InputGroup.Prepend>
							<Button
								variant="secondary"
								onClick={this.onClickSearch}
								className="search-section"
							>
								{this.state.loading ? (
									<SpinnerComponent />
								) : (
									<i className="fas fa-search"></i>
								)}
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
		);
	}
}

export default InputSearchCustomer;
