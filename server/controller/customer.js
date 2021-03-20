const customerControler = {};
const { Customer } = require("../models/customer");

let getAge = (birthdate) => {
	let date = new Date(birthdate);
	let now = new Date();
	let age = now.getFullYear() - date.getFullYear();
	let month = now.getMonth() - date.getMonth();
	if (month < 0 || (month === 0 && now.getDate() < date.getDate())) age--;
	return age;
};

function isObjEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) return true;
	}

	return false;
}

const record = (id, data) => {
	let time = new Date(Date.now());
	if (data) {
		return {
			id: id,
			date: time.toLocaleDateString(),
			time: `${time.getHours()}:${time.getMinutes()}`,
			serologicas: isObjEmpty(data.serologicas),
			cuadroHematico: isObjEmpty(data.cuadroHematico),
			coprologico: isObjEmpty(data.coprologico),
			parcialOrina: isObjEmpty(data.parcialOrina),
			quimicaSanguinea: isObjEmpty(data.quimicaSanguinea),
		};
	}
	return {};
};

customerControler.add = (req, res) => {
	let dataCustomer = {
		name: req.body.name,
		lastname: req.body.lastname,
		cc: req.body.cc,
		direction: req.body.direction,
		email: req.body.email,
		phone: req.body.phone,
		birthdate: req.body.birthdate,
		genre: req.body.genre,
		age: getAge(req.body.birthdate),
	};
	const newCustomer = new Customer(dataCustomer);
	Customer.findOne({ cc: req.body.cc }, (err, customer) => {
		if (err) res.json({ message: "there is an error" });
		if (!customer) {
			newCustomer.save((err, doc) => {
				if (err) {
					res.json({ success: false, message: "Datos invalidos" });
				}
				return res
					.status(200)
					.json({ success: true, message: "Cliente añadido correctamente" });
			});
		} else {
			return res.json({ success: false, message: "El cliente ya existe" });
		}
	});
};

customerControler.getCustomers = (req, res) => {
	if (req.body.cc) {
		return Customer.findOne({ cc: req.body.cc }, (err, customer) => {
			if (err) res.json({ message: "there is an error" });
			if (customer) {
				return res
					.json({
						customer: customer,
					})
					.status(200);
			}
			return res.json({
				success: false,
				message: "Lo sentimos, el cliente no existe",
			});
		});
	}

	Customer.find((err, doc) => {
		if (err) res.json({ success: false, message: "Datos invalidos" });
		if (doc) {
			return res.status(200).json({ success: true, customers: doc });
		} else {
			return res.status(404).json({ success: false, customers: null });
		}
	});
};

customerControler.addRecord = (req, res) => {
	Customer.findOne({ cc: req.body.cc }, (err, customer) => {
		if (err) console.log(err);
		const newRecord = [
			...customer.records,
			record(customer.records.length, req.body.newRecord),
		];
		Customer.findOneAndUpdate(
			{ cc: req.body.cc },
			{ records: newRecord },
			{ new: true },
			(err, data) => {
				if (err) res.json({ res: err });

				return res.send(data.records);
			}
		);
	});
};

customerControler.getRecords = (req, res) => {
	Customer.findOne({ cc: req.params.cc}, (err, customer) => {
		if (err) {
			console.log(err);
			return res.json({ message: "error" });
		}
		return res.json({ customer: customer, message: "ok" });
	});
};

module.exports = customerControler;
