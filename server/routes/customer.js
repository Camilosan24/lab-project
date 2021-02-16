const express = require('express')
const {auth} = require('../middleware/auth')
const customerControler = require('../controller/customer')
const router = express.Router();


//POST ROUTES
router.post('/add', customerControler.add)
router.post('/addRecord', customerControler.addRecord)


//GET ROUTES
router.get('/getRecords/:cc', customerControler.getRecords)
module.exports = router