const express = require("express");
const { auth } = require("../middleware/auth");
const customerControler = require("../controller/customer");
const router = express.Router();

//POST ROUTES
router.post("/addcustomer", customerControler.addCustomer);
router.post("/showrecord", customerControler.showRecord);
router.post("/getcustomers", customerControler.getCustomers);

//GET ROUTES
router.get("/getcustomer/:cc", customerControler.getCustomer);

//DELETE ROUTES
router.delete("/deletecustomer/:cc", customerControler.deleteCustomer);


module.exports = router;