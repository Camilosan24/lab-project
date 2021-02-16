const express = require('express')
const router = express.Router()
const {auth} = require('../middleware/auth')
const userControler = require('../controller/user')


//POST ROUTES
router.post('/register', userControler.register)
router.post('/login', userControler.login);


//GET ROUTES
router.get('/auth',auth, userControler.auth)
router.get('/logout',auth, userControler.logout)

module.exports = router