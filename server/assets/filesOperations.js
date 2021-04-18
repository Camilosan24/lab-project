const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const uploadFileToAWS = async (body, url) => {
	try {
		return await new Promise((resolve, reject)=>{
			s3.upload(
				{
					Bucket: "savefilesmarisolmgl",
					Key: url,
					Body: body,
				}, (err, data)=>{
					if(err) reject("Hubo un problema al guardar el archivo")
					return resolve(data);

				}
			);
		})
	} catch (error) {
		console.log("hubo un error");
		return new Error("Error al guardar el archivo");
	}
};

const getFileFromAWS = (path) => {};

module.exports = { uploadFileToAWS, getFileFromAWS };
