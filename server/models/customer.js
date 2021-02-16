const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
   name:{
      type: String,
      required: true,
      trim: true
   },

   lastname: {
      type: String,
      required: true,
      trim: true
   },
   CC:{
      type: Number,
      required: true,
      trim: true,
      unique: 1
   },
   direction: {
      type: String,
      required: true,
      trim: true
   },
	email: {
		type: String,
		required: true,
		trim: true,
		unique: 1,
	},
   phone:{
      type: Number,
		required: true,
		trim: true
   },
   records: {
      type: Object
   }
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = { Customer };