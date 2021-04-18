const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");
const record = require("../models/record");
const { uploadFileToAWS } = require("./filesOperations.js");

const generatePdf = async (file, fileName, document) => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent(file);
		await page.emulateMediaType("print");
		const pdf = await page.pdf({
			format: "A4",
			printBackground: true,
			margin: {
				top: "1cm",
				bottom: "1cm",
				left: "1cm",
				right: "1cm",
			},
		});
		await browser.close();
		return pdf;
	} catch (err) {
		return false;
	}
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
	// return new Error("Lo sentimos, hubo un error en el proceso de creacion del PDF");
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
