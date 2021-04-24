import axios from "axios";

export default function requests(entorno = "dev") {
	let host = "";
	host = "http://localhost:3001";
	// if (entorno === "dev") {
	// }

	return {
		getCustomers: function (skip) {
			return axios.post(`${host}/api/customer/getcustomers`, { skip: skip });
		},
		deleteCustomerByCC: function (cc) {
			return axios.delete(`${host}/api/customer/deletecustomer/${cc}`);
		},
		getCustomerByCc: function (params) {
			return axios.get(`${host}/api/customer/getcustomer/${params}`);
		},
		addCustomer: function (customerData) {
			return axios.post(`${host}/api/customer/addcustomer`, customerData);
		},
		showRecord: function (recordData) {
			return axios.post(`${host}/api/customer/showrecord`, recordData);
		},
		saveRecord: function (recordData) {
			return axios.post(`${host}/api/customer/showrecord`, recordData);
		},
		login: function (info) {
			return axios.post(`${host}/api/user/login`, info);
		},
		register: function (info) {
			return axios.post(`${host}/api/user/register`, info);
		},
		logout: function () {
			return axios.get(`${host}/api/user/logout`);
		},
		auth: async function (props) {
			return await axios.get(`${host}/api/user/auth`).then((res) => {
				if (res.data.auth) {
					return true;
				}
				return props.history.push("/");
			});
		},
	};
}
