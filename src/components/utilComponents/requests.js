import axios from "axios";

export default function requests(entorno) {
	let host = "";
	if (entorno === "dev") {
		host = "http://localhost:3001";
	}

	return {
		getCustomers: function () {
			return axios.get(`${host}/api/customer/getcustomers`);
		},
		getCustomerByCc: function (params) {
			return axios.get(`${host}/api/customer/getcustomer/${params}`);
		},
		addCustomer: function (customerData) {
			return axios.post(`${host}/api/customer/addcustomer`, customerData);
		},
		addRecord: function (recordData) {
			return axios.post(`${host}/api/customer/addrecord`, recordData);
		},
		login: function (info) {
			return axios.post(`${host}/api/user/login`, info);
		},
		logout: function () {
			return axios.get(`${host}/api/user/logout`);
		},
		auth: async function (props) {
			return await axios.get(`${host}/api/user/auth`).then(res => {
				if(res.data.auth){
					return true
				}
				return  props.history.push('/')
			})
		},
	};
}
