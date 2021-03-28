const puppeteer = require("puppeteer");
const ejs = require ('ejs')
const path = require('path');
const { send } = require("process");


const pdfGenerator =  (url = "http://localhost:3000/pdf") => {
	try {
    const name = 'jea'
		 ejs.renderFile(
		   path.join(__dirname, "../", "templates", "index.ejs"),
		   { data: "no se nada" },
		   async(err, file) => {
		      const browser = await puppeteer.launch();
		      const page = await browser.newPage();
		      await page.setContent(file);
		      await page.emulateMediaType("print");
		      await page.pdf({
		         path: `../uploads/${name}.pdf`,
		         format: "A4",
		         printBackground: true,
		         margin: {
		            top: "1.25cm",
		            bottom: "1.25cm",
		            left: "1.25cm",
		            right: "1.25cm",
		         },
		      });
		      await browser.close();
		      process.exit();
		   }
		);
	} catch (error) {
		throw error;
	}
};

pdfGenerator();

module.exports = {
	pdfGenerator,
};

// const page = await browser.newPage();
// await page.setCacheEnabled(false);
// await page.goto(url, {waitUntil: 'networkidle2'});
// await page.emulateMediaType('print')
// await page.pdf({
//   path: `../uploads/${name}.pdf`,
//   format: 'A4',
//   printBackground: true,
//   displayHeaderFooter: true,
// });

// browser.close();

// ejs.renderFile(
//    path.join(__dirname, "../", "templates", "index.ejs"),
//    { datos: "no se nada" },
//    async (err, file) => {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       await page.setContent(file);
//       await page.emulateMediaType("print");

//       console.log("done");
//       await page.pdf({
//          path: `../uploads/${name}.pdf`,
//          format: "A4",
//          printBackground: true,
//          margin: {
//             top: "2.54cm",
//             bottom: "2.54cm",
//             left: "2.54cm",
//             right: "2.54cm",
//          },
//       });
//       await browser.close();
//       process.exit();
//    }
// );
