const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");
const record = require("../models/record");

const generatePdf = async (file, fileName, document) => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent(file);
		await page.emulateMediaType("print");
		await page.pdf({
			path: `${path.join(
				__dirname,
				"../public",
				"pdfs",
				`${document}`,
				`${fileName}.pdf`
			)}`,
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
		return { success: true, message: "Creado Correctamente" };
	} catch (err) {
		return {
			success: false,
			message: "La creacion del PDF tuvo un error (PDF)",
		};
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
		return {
			record: null,
			success: false,
			message: "La creacion del PDF tuvo un error (Template)",
		};
	}
};

const recordGenerator = async (customer, dataRecord) => {
	let newRecord = record(customer, dataRecord);
	let templateGenerated = await createTemplate(customer, newRecord, dataRecord);
	if (templateGenerated) {
		let result = await generatePdf(
			templateGenerated,
			newRecord.metaData.fileName,
			customer.cc
		);
		if (result.success) {
			return {
				record: newRecord.record,
				success: true,
				message: result.message,
			};
		}
		return result;
	}

	return {
		record: null,
		success: false,
		message: "El template no pudo ser generado correctamente",
	};
};

module.exports = recordGenerator;
