import React from "react";
import { Col } from "react-bootstrap";
import Carousel from "../carousel/index";
import requests from "../utilComponents/requests";

class Home extends React.Component {
	// async componentDidMount() {
	// 	return await requests().auth(this.props);
	// }

	render() {
		return (
			<Col className="d-flex justify-content-center">
				<Carousel />
			</Col>
		);
	}
}

export default Home;
