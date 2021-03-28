import React from "react";
import "./styles.css";
import { Carousel, Col } from "react-bootstrap";

import Image1 from '../../images/image-1.jpg'
import Image2 from '../../images/image-2.jpg'
import Image3 from '../../images/image-3.jpg'
import Image4 from '../../images/image-4.jpg'
import Image5 from '../../images/image-5.jpg'
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
					}}
				>
					<Carousel controls={false} indicators={false}>
						<Carousel.Item interval={5000}>
							<img
								className="d-block w-100"
								src={Image1}
								alt="First slide"
								height="1500px"
								width="700px"
							/>
						</Carousel.Item>
						<Carousel.Item interval={5000}>
							<img
								className="d-block w-100"
								src={Image2}
								alt="First slide"
								height="1500px"
								width="700px"
							/>
						</Carousel.Item>
						<Carousel.Item interval={5000}>
							<img
								className="d-block w-100"
								src={Image3}
								alt="First slide"
								height="1500px"
								width="700px"
							/>
						</Carousel.Item>
						<Carousel.Item interval={5000}>
							<img
								className="d-block w-100"
								src={Image4}
								alt="Third slide"
								height="1500px"
								width="700px"
							/>
						</Carousel.Item>
						<Carousel.Item interval={5000}>
							<img
								className="d-block w-100"
								src={Image5}
								alt="Third slide"
								height="1500px"
								width="700px"
							/>
						</Carousel.Item>
					</Carousel>
					<Col
						className="background-login-2 p-0"
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
