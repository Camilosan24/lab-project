import React from "react";
import { Spinner } from "react-bootstrap";

class SpinnerComponent extends React.Component {
	render() {
		return (
			<Spinner animation="border" variant="light" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		);
	}
}

export default SpinnerComponent;
