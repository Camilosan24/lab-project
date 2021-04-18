const express = require("express");
const { auth } = require("../middleware/auth");
const customerControler = require("../controller/customer");
const router = express.Router();

//POST ROUTES
router.post("/addcustomer", customerControler.addCustomer);
router.post("/showrecord", customerControler.showRecord);
// router.post("/saverecord", customerControler.saveRecord);

//GET ROUTES
router.get("/getcustomer/:cc", customerControler.getCustomer);
router.get("/getcustomers", customerControler.getCustomers);

module.exports = router;
