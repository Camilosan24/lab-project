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
	let record = {
		id: Date.now(),
		date: new Date(Date.now()).toLocaleDateString(),
		serologica: req.body.serologicas,
		cuadroHematico: req.body.cuadroHematico,
		parcialOrina: req.body.parcialOrina,
		coprologico: req.body.coprologico,
		quimicaSanguinea: req.body.quimicaSanguinea
	};

	Customer.findOne({ cc: req.body.cc }, (err, customer) => {
		const newRecord = [ ...customer.records, record ];
		Customer.findOneAndUpdate(
			{ cc: req.body.cc },
			{ records: newRecord },
			{ new: true },
			(err, data) => {
				if (err) res.json({ res: data.records });

				return res.send(data.records);
			}
		);
	});
};

module.exports = customerControler;
