import React from "react";
import { Col } from "react-bootstrap";
import Carousel from "../../components/carousel/index";
import getAuth from "../../components/utilComponents/getAuth";

class Home extends React.Component {
	componentDidMount() {
		getAuth(this.props);
	}
	render() {
		return (
			<Col className="d-flex justify-content-center">
				<Carousel />
				<div
					style={{
						position: "absolute",
						zIndex: 200,
						top: "30%",
						color: "white",
						fontSize: "3em",
					}}
				>
					<span className="">Bienvenido :)</span>
				</div>


			</Col>
		);
	}
}

export default Home;
