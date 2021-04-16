const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");
const record = require("../models/record");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const uploadFileToAWS = async (folder, body, url) => {
	try {
		s3.get;
		s3.upload(
			{
				Bucket: "savefilesmarisolmgl",
				Key: url,
				Body: body,
			},
			(err, data) => {
				if (err) throw err;
				console.log(data)
				return {
					success: true,
					message: "El archivo se guardo correctamente",
				};
			}
		);
	} catch (error) {
		return new Error("Error al guardar el archivo");
	}
};

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
		return new Error("Error al crear el pdf");
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
		return new Error("Error al crear el template");
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

		await uploadFileToAWS(
			customer.cc,
			body,
			newRecord.record.url
		)

		return {
			success: true,
			record: newRecord.record,
			message: "El archivos se ha creado correctamente",
		};
	} catch (error) {
		return {
			record: null,
			success: false,
			message: "Lo sentimos, hubo un error en el proceso de creacion del PDF",
		};
	}
};

module.exports = recordGenerator;
