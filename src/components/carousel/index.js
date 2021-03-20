import React from "react";
import "./styles.css";
import { Carousel, Col } from "react-bootstrap";
class CarouselComponent extends React.Component {
	render() {
		return (
			<>
				<Col
					className="p-0 m-0"
					style={{
						position: "absolute",
						height: "100vh",
						width: "100vw",
						margin: 0,
						padding: 0,
					}}
				>
					<Carousel controls={false} indicators={false}>
						<Carousel.Item interval={5000}>
							<img
								className="d-block w-100"
								src="https://million-wallpapers.com/wallpapers/6/7/444419239496953/hot-air-balloons.jpg"
								alt="First slide"
								height="1500px"
								width="700px"
							/>
						</Carousel.Item>
						<Carousel.Item interval={5000}>
							<img
								className="d-block w-100"
								src="https://www.todopaisajes.com/Minis/atardecer-en-el-lago.jpg"
								alt="First slide"
								height="1500px"
								width="700px"
							/>
						</Carousel.Item>
						<Carousel.Item interval={5000}>
							<img
								className="d-block w-100"
								src="https://wallpaperstock.net/wallpapers/thumbs1/38757wide.jpg"
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
							right: 0,
							left: 0,
							bottom: 0,
							backgroundColor: "black",
							opacity: "0.7",
						}}
					></Col>
				</Col>
			</>
		);
	}
}

export default CarouselComponent;
