const express = require('express')
const {auth} = require('../middleware/auth')
const customerControler = require('../controller/customer')
const router = express.Router();


//POST ROUTES
router.post('/add', customerControler.add)
router.post('/getcustomers', customerControler.getCustomers)
router.post('/addrecord', customerControler.addRecord)


//GET ROUTES
// router.get('/getrecords/:cc', customerControler.getRecords)
module.exports = router