const express = require('express');  
const router = express.Router();
const studentController = require('./controllers/studentController')

router.get('/',studentController.home)
router.get('/registerpage',studentController.registerpage)
router.get('/login/:uname',studentController.dashboard)

router.post('/login',studentController.login)
router.post('/register',studentController.register)
router.post('/createaccount',studentController.createaccount)


module.exports = router;


