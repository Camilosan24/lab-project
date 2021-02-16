const customerControler = {};
const { Customer } = require("../models/customer");

customerControler.add = (req, res) => {
	const newCustomer = new Customer(req.body);
	Customer.findOne({ CC: req.body.CC }, (err, customer) => {
		if (err) res.json({ message: "there is an error" });
		if (!customer) {
			newCustomer.save((err, doc) => {
				if (err) {
               re.json({success: false, message: 'Datos invalidos'})
				}
				return res.status(200).json({ success: true, message: "Cliente añadido correctamente" });
			});
		} else {
         return res.json({ success: false, message: "El cliente ya existe" });
      }
	});
};

customerControler.addRecord = (req, res) =>{
	Customer.findOneAndUpdate()
}

customerControler.getRecords = (req, res) =>{
	let cc = req.params;
	Customer.findOne({CC: cc}, (err, customer)=>{
		if (err) res.json({ message: "there is an error" });
		if (customer) {
			return res.json({cc: customer.CC, name: customer.name, records: customer.records}).status(200)
		}
		return res.json({success: false, message: 'El cliente no existe o no tiene registros'})
	});
}



// customerControler.findById = (req, res)=>{
//    Customer.findById({_id: req.body.CC}, (err, user)=>{
//       if(!user){
//          return res.json({
//             user: null,
//             message: 'The user doesnt exist'
// 			});
//       }
//    })
// }

module.exports = customerControler;
