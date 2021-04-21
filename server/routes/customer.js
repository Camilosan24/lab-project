const express = require("express");
const { auth } = require("../middleware/auth");
const customerControler = require("../controller/customer");
const router = express.Router();

//POST ROUTES
router.post("/addcustomer", customerControler.addCustomer);
router.post("/showrecord", customerControler.showRecord);

//GET ROUTES
router.get("/getcustomer/:cc", customerControler.getCustomer);
router.post("/getcustomers", customerControler.getCustomers);

//DELETE ROUTES
router.delete("/deletecustomer/:cc", customerControler.deleteCustomer);


module.exports = router;