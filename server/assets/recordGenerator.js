const pdf = require("html-pdf");
const path = require("path");
const ejs = require("ejs");
const record = require("../models/record");
const { uploadFileToAWS } = require("./filesOperations.js");
// const puppeteer = require("puppeteer");
const generatePdf = async (file, fileName, document) => {
	return new Promise((resolve, reject) => {
		pdf.create(file, { format: "A4" }).toBuffer((err, res) => {
			if (err) return reject("Hubo un error en la creacion del pdf");
			return resolve(res);
		});
	});
};

const createTemplate = async (customer, addSecitons, infoSections) => {
	try {
		return await ejs.renderFile(
			path.join(__dirname, "templates", "index.ejs"),
			{
				addSection: addSecitons.record,
				info: infoSections,
				customer,
			}
		);
	} catch (error) {
		return false;
	}
};

const recordGenerator = async (customer, dataRecord) => {
	let newRecord = record(customer, dataRecord);
	try {
		let templateGenerated = await createTemplate(
			customer,
			newRecord,
			dataRecord
		);
		let body = await generatePdf(
			templateGenerated,
			newRecord.metaData.fileName,
			customer.cc
		);
		if (!body)
			return {
				success: false,
				record: null,
				file: null,
				message: "Lo sentimos, hubo un error en la creacion del pdf",
			};

		let resultado = await uploadFileToAWS(body, newRecord.record.url);
		newRecord.record.url = resultado.Location;

		return {
			success: true,
			record: newRecord.record,
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
