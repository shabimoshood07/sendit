 const express = require('express')
 const router = express.Router()


 const {
    register,
    login
 } = require('../controllers/authcontroller')

 router.route('/user/signup').post(register)
 router.route('/user/login').post(login)
 
 module.exports = router
 