import React from "react";
import { Carousel } from "react-bootstrap";
class CarouselComponent extends React.Component {
	render() {
		return (
			<Carousel
				controls={false}
				style={{
					position: "absolute",
					height: "100vh",
					width: "100vw",
					margin: "0",
					padding: "0",
					left: "0.0002%",
				}}
				className="imagesCarusel"
			>
				<Carousel.Item interval={3000}>
					<img
						className="d-block w-100"
						src="https://kaikucaffelatte.com/blog/wp-content/uploads/2020/03/shutterstock_510679489-scaled.jpg"
						alt="First slide"
						height="1500px"
						width="700px"
					/>
				</Carousel.Item>
				<Carousel.Item interval={3000}>
					<img
						className="d-block w-100"
						src="https://s1.1zoom.me/big0/927/Canada_Mountains_Scenery_488701.jpg"
						alt="Third slide"
						height="1500px"
						width="700px"
					/>
				</Carousel.Item>
				<Carousel.Item interval={3000}>
					<img
						className="d-block w-100"
						src="http://2.bp.blogspot.com/-0uoAEfCm_sE/T7Pjziv8fQI/AAAAAAAAN2A/vfepu3e7f34/s1600/Fondos+de+pantalla+con+bellos+rincones+de+la+naturaleza+(73).jpg"
						alt="Third slide"
						height="1500px"
						width="700px"
					/>
				</Carousel.Item>
			</Carousel>
		);
	}
}

export default CarouselComponent;
