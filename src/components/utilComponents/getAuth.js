import axios from "axios";

const getAuth = (props) => {
	axios.get("http://localhost:3001/api/user/auth").then((res) => {
		if (!res.data.auth) {
			return props.history.push("/");
		}
	});
};

export default getAuth;
