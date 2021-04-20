function isObjEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) return true;
	}
	return false;
}

function formatDate(time) {
	let hh = time.getHours();
	let m = time.getMinutes();
	let s = time.getSeconds();
	let dd = "am";
	let h = hh;
	if (h >= 12) {
		h = hh - 12;
		dd = "pm";
	}
	if (h == 0) {
		h = 12;
	}
	m = m < 10 ? "0" + m : m;
	s = s < 10 ? "0" + s : s;
	h = h < 10 ? "0" + h : h;
	let replacement = h + ":" + m + ":" + s + " " + dd;
	return replacement;
}

function record(customer, data, colombiaTime) {
	let fileName = `${customer.cc}-${
		customer.records.length
	}-${colombiaTime.getMilliseconds()}`;
	if (data) {
		return {
			id: customer.records.length,
			date: colombiaTime.toLocaleDateString(),
			time: formatDate(colombiaTime),
			serologicas: isObjEmpty(data.serologicas),
			cuadroHematico: isObjEmpty(data.cuadroHematico),
			coprologico: isObjEmpty(data.coprologico),
			parcialOrina: isObjEmpty(data.parcialOrina),
			quimicaSanguinea: isObjEmpty(data.quimicaSanguinea),
			url: `pdfs/${customer.cc}/${fileName}.pdf`,
		};
	}
	return {};
}

module.exports = record;
