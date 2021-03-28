import axios from "axios";

export default function requests(entorno = '') {
	let host;
	if (entorno === 'dev') {
		host = "http://localhost:3001";
	} else {
		host = " http://192.168.43.227:3001";
	}

	return {
		getCustomers: function () {
			return axios.get(`${host}/api/customer/getcustomers`)
		},
		getCustomerByCc: function (params) {
			return axios.get(`${host}/api/customer/getcustomer/${params}`)
		},
		addCustomer: function (customerData) {
			return axios.post(`${host}/api/customer/addcustomer`, customerData)
		},
      addRecord: function (recordData) {
			return axios.post(`${host}/api/customer/addrecord`, recordData)
		},
		login: function(info){
			return axios.post(`${host}/api/user/login`, info)
		},
		logout: function() {
			return axios.get(`${host}/api/user/logout`)
		},
		auth: function() {
			return axios.get(`${host}/api/user/auth`)
		}
	};
}
