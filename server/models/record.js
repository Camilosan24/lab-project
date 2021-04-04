function isObjEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) return true;
	}

	return false;
}

function record(customer, data) {
	let time = new Date(Date.now());
	let fileName = `${customer.cc}-${customer.records.length}-${time.getMilliseconds()}`;
	if (data) {
		return {
			metaData: {
				fileName: fileName,
			},
			record: {
				id: customer.records.length,
				date: time.toLocaleDateString(),
				time: `${time.getHours()}:${time.getMinutes()}`,
				serologicas: isObjEmpty(data.serologicas),
				cuadroHematico: isObjEmpty(data.cuadroHematico),
				coprologico: isObjEmpty(data.coprologico),
				parcialOrina: isObjEmpty(data.parcialOrina),
				quimicaSanguinea: isObjEmpty(data.quimicaSanguinea),
				url: `/pdfs/${customer.cc}/${fileName}.pdf`,
			},
		};
	}
	return {};
}

// const record = (customer ,data) => {
// 	return {
// 		metaData: {
// 			fileName: "hola",
// 		},
// 		record: {
// 			id: 1,
// 			date: time.toLocaleDateString(),
// 			time: `${time.getHours()}:${time.getMinutes()}`,
// 			serologicas: false,
// 			cuadroHematico: false,
// 			coprologico: false,
// 			parcialOrina: false,
// 			quimicaSanguinea: false,
// 			url: `/pdfs/hola.pdf`,
// 		},
// 	};
// };

module.exports = record;
