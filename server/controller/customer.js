const customerControler = {};
const { Customer } = require("../models/customer");
const recordGenerator = require("../assets/recordGenerator");

const capitalize = (name) => {
	return name
		.trim()
		.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

const findCustomer = async (cc) => {
	return await Customer.findOne({ cc: cc });
};

const getAge = (birthdate) => {
	let date = new Date(birthdate);
	let now = new Date();
	let age = now.getFullYear() - date.getFullYear();
	let month = now.getMonth() - date.getMonth();
	if (month < 0 || (month === 0 && now.getDate() < date.getDate())) age--;
	return age;
};

customerControler.addCustomer = async (req, res) => {
	let dataCustomer = {
		name: capitalize(req.body.name),
		lastname: capitalize(req.body.lastname),
		cc: req.body.cc,
		direction: req.body.direction,
		email: req.body.email,
		phone: req.body.phone,
		birthdate: req.body.birthdate,
		genre: req.body.genre,
		age: getAge(req.body.birthdate),
		records: [],
	};

	if (dataCustomer.age < 1) {
		return res.json({
			success: false,
			message: "La fecha de nacimiento no es correcta",
			data: null,
		});
	}

	const newCustomer = new Customer(dataCustomer);
	let customer = await findCustomer(req.body.cc);
	if (!customer) {
		newCustomer.save((err, doc) => {
			if (err) {
				res.json({ success: false, message: "Datos invalidos", data: null });
			}
			return res.status(200).json({
				success: true,
				message: "Cliente añadido correctamente",
				data: customer,
			});
		});
	} else {
		return res.json({
			success: false,
			message: "El cliente ya existe",
			data: null,
		});
	}
};

customerControler.getCustomers = (req, res) => {
	Customer.find((err, customer) => {
		if (err)
			res.json({ success: false, message: "Hubo un error en la petición" });
		if (customer) {
			return res
				.status(200)
				.json({ success: true, customers: customer, message: "" });
		} else {
			return res.status(404).json({
				success: false,
				message: "No existen clientes",
				customers: null,
			});
		}
	});
};

customerControler.getCustomer = async (req, res) => {
	if (Number(req.params.cc)) {
		let customer = await findCustomer(req.params.cc);
		if (customer) {
			return res
				.json({
					success: true,
					customer: customer,
					records: customer.records,
				})
				.status(200);
		}
		return res
			.json({
				success: false,
				customer: customer,
				message: "Lo sentimos, el cliente no existe",
			})
			.status(200);
	}
	return res.json({
		success: false,
		message: "Datos invalidos",
	});
};

customerControler.showRecord = async (req, res) => {
	if (Number(req.body.cc)) {
		try {
			let customer = await findCustomer(req.body.cc);
			const recordGenerated = await recordGenerator(
				customer,
				req.body.newRecord
			);
			// if (recordGenerated.success) {
			// 	const newArrayRecord = [...customer.records, recordGenerated.record];
			// 	Customer.findOneAndUpdate(
			// 		{ cc: req.body.cc },
			// 		{ records: newArrayRecord },
			// 		{ new: true },
			// 		(err, doc) => {
			// 			if (err) {
			// 				return res.status(400).json({
			// 					success: false,
			// 					message: "Lo sentimos, ha ocurrido un error",
			// 				});
			// 			}
			return res.json({
				message: "pdf generado",
				success: true,
			});
			// 		}
			// 	);
			// }
		} catch (err) {
			return res.status(400).json({
				success: false,
				message: "Lo sentimos, ha ocurrido un error",
			});
		}
	} else {
		return res.json({
			success: false,
			message: "Datos invalidos",
		});
	}
};

module.exports = customerControler;
