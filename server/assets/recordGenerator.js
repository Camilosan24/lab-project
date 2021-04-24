const record = require("../models/record");
const path = require("path");
const ejs = require("ejs");
const pdf = require("html-pdf");

const generatePdf = (file, url) => {
	return new Promise((resolve, reject) => {
		pdf
			.create(file, {
				format: "A4",
			})
			.toFile(path.join(__dirname, "..", "public", `${url}`), (err, res) => {
				if (err) return reject("Hubo un error en la creacion del pdf");
				return resolve(res);
			});
	});
};

const createTemplate = async (customer, addSections, infoSections) => {
	try {
		return await ejs.renderFile(
			path.join(__dirname, "templates", "index.ejs"),
			{
				addSection: addSections,
				info: infoSections,
				customer,
			}
		);
	} catch (error) {
		return false;
	}
};

const recordGenerator = async (customer, dataRecord, colombiaTime) => {
	let newRecord = record(customer, dataRecord, colombiaTime);
	try {
		let templateGenerated = await createTemplate(
			customer,
			newRecord,
			dataRecord
		);
		let body = await generatePdf(
			templateGenerated,
			newRecord.url,
			customer.cc
		);
		if (!body)
			return {
				success: false,
				record: null,
				message: "Lo sentimos, hubo un error en la creacion del pdf",
			};

		return {
			success: true,
			record: newRecord,
			message: "El archivos se ha creado correctamente",
		};
	} catch (error) {
		return {
			success: false,
			record: null,
			message: "El archivos no se ha podido crear correctamente",
		};
	}
};

module.exports = recordGenerator;
