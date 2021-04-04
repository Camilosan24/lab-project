const customerControler = {};
const { Customer } = require("../models/customer");
const recordGenerator = require("../assets/recordGenerator");
const fs = require("fs");
const path = require("path");

let getAge = (birthdate) => {
	let date = new Date(birthdate);
	let now = new Date();
	let age = now.getFullYear() - date.getFullYear();
	let month = now.getMonth() - date.getMonth();
	if (month < 0 || (month === 0 && now.getDate() < date.getDate())) age--;
	return age;
};

customerControler.addCustomer = (req, res) => {
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
	Customer.findOne({ cc: req.body.cc }, (err, customer) => {
		if (err) res.json({ message: "there is an error" });
		if (!customer) {
			fs.mkdir(
				path.join(__dirname, "..", "public", "pdfs", `${req.body.cc}`),
				(err) => {
					if (err) {
						return res.json({
							success: false,
							message: "No se pudo crear la carpeta, vuelvalo a intentar",
							data: null,
						});
					}
				}
			);
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
	});
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

customerControler.getCustomer = (req, res) => {
	if (Number(req.params.cc)) {
		return Customer.findOne({ cc: req.params.cc }, (err, customer) => {
			if (err) res.json({ message: "Hubo un error en la petición" });
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
		});
	}
	return res.json({
		success: false,
		message: "Datos invalidos",
	});
};

customerControler.addRecord = (req, res) => {
	if (Number(req.body.cc)) {
		Customer.findOne({ cc: req.body.cc }, async (err, customer) => {
			if (err) {
				return res.send(err);
				throw err;
			}
			const recordGenerated = await recordGenerator(
				customer,
				req.body.newRecord
			);
			if (recordGenerated.success) {
				const newRecord = [recordGenerated.record, ...customer.records];

				Customer.findOneAndUpdate(
					{ cc: req.body.cc },
					{ records: newRecord },
					{ new: true },
					(err, doc) => {
						if (err) {
							return res.json({
								success: false,
								message: "Ocurrio un error",
							});
							throw err;
						}
						return res.send(recordGenerated);
					}
				);
			}
		});
	} else {
		return res.json({
			success: false,
			message: "Datos invalidos",
		});
	}
};

module.exports = customerControler;
