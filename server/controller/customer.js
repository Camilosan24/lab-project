const customerControler = {};
const { Customer } = require("../models/customer");
const recordGenerator = require("../assets/recordGenerator");
const fs = require("fs");
const path = require("path");

const capitalize = (name) => {
	return name
		.trim()
		.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

const findCustomer = async (cc) => {
	return await Customer.findOne({ cc: cc });
};

const getAge = (birthdate) => {
	let colombiaTime = new Date(Date.now() - 300 * 60000);
	let date = new Date(birthdate);
	let age = colombiaTime.getFullYear() - date.getFullYear();
	let month = colombiaTime.getMonth() - date.getMonth();
	if (month < 0 || (month === 0 && colombiaTime.getDate() < date.getDate()))
		age--;
	return age;
};

function fileExists(path) {
	try {
		if (fs.lstatSync(path)) return true;
	} catch (e) {
		return false;
	}
}

const deleteFiles = (files, folderPath) => {
	return new Promise((res, rej) => {
		for (const file of files) {
			fs.unlink(path.join(folderPath, file), (err) => {
				if (err) return rej(false);
			});
		}
		res(true);
	});
};

const deleteFolder = (folderPath) => {
	if (!fileExists(folderPath)) return;
	return new Promise((resolve, reject) => {
		fs.readdir(folderPath, async (err, files) => {
			if (err) return reject("Hubo un error al encontrar los archivos");
			if (files.length) {
				const res = await deleteFiles(files, folderPath);
				if (!res) return { succes: false, message: "Error" };
			}
			return fs.rmdir(folderPath, (err) => {
				if (err) reject("Hubo un error al eliminar la carpeta");
				return resolve("Eliminado satisfactoriamente");
			});
		});
	});
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
				return res.json({
					success: false,
					message: "Datos invalidos",
					data: null,
				});
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
	})
		.skip(req.body.skip)
		.limit(10);
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
	let colombiaTime = new Date(Date.now() - 300 * 60000);
	if (Number(req.body.cc)) {
		try {
			let customer = await findCustomer(req.body.cc);
			const recordGenerated = await recordGenerator(
				customer,
				req.body.newRecord,
				colombiaTime
			);
			if (recordGenerated.success) {
				const newArrayRecord = [...customer.records, recordGenerated.record];
				Customer.findOneAndUpdate(
					{ cc: req.body.cc },
					{ records: newArrayRecord },
					{ new: true },
					(err, doc) => {
						if (err) {
							return res.status(400).json({
								success: false,
								message: "Lo sentimos, ha ocurrido un error",
							});
						}
						return res.json({
							message: "pdf generado correctamente",
							success: true,
						});
					}
				);
			}
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

customerControler.deleteCustomer = async (req, res) => {
	const directory = path.join(__dirname, "..", "public", "pdfs", req.params.cc);
	try {
		await deleteFolder(directory);
		Customer.findOneAndRemove({ cc: req.params.cc }, (err, doc) => {
			if (err)
				return res.json({
					succes: false,
					message: "Ocurrio un error al eliminar el cliente",
				});
			return res.json({
				success: true,
				message: "Cliente eliminado correctamente",
			});
		});
	} catch (error) {
		return res.json({
			success: false,
			message: "Ocurrio un error al eliminar el cliente",
		});
	}
};
module.exports = customerControler;
