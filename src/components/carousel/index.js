import React from "react";
import { Carousel, Col } from "react-bootstrap";
class CarouselComponent extends React.Component {
	render() {
		return (
			<Col className="pl-0">
				<Carousel
					controls={false}
					style={{
						position: "relative",
						height: "100vh",
						width: "100vw",
						margin: "0",
						padding: "0",
						left: 0,
					}}
					className="imagesCarusel"
				>
					<Carousel.Item interval={5000}>
						<img
							className="d-block w-100"
							src="https://kaikucaffelatte.com/blog/wp-content/uploads/2020/03/shutterstock_510679489-scaled.jpg"
							alt="First slide"
							height="1500px"
							width="700px"
						/>
					</Carousel.Item>
					<Carousel.Item interval={5000}>
						<img
							className="d-block w-100"
							src="https://s1.1zoom.me/big0/927/Canada_Mountains_Scenery_488701.jpg"
							alt="Third slide"
							height="1500px"
							width="700px"
						/>
					</Carousel.Item>
					<Carousel.Item interval={5000}>
						<img
							className="d-block w-100"
							src="https://astelus.com/wp-content/viajes/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg"
							alt="Third slide"
							height="1500px"
							width="700px"
						/>
					</Carousel.Item>
				</Carousel>
				<Col
					className="background-login-2"
					style={{
						position: "absolute",
						height: "100vh",
						width: "100vw",
						top: 0,
						backgroundColor: "black",
						opacity: "0.7",
					}}
				></Col>
			</Col>
		);
	}
}

export default CarouselComponent;
