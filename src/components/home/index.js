import React from "react";
import { Col } from "react-bootstrap";
import Carousel from "../carousel/index";

class Home extends React.Component {

	render() {
		return (
			<Col className="d-flex justify-content-center">
				<Carousel />
			</Col>
		);
	}
}

export default Home;
