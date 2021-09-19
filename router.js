const express = require('express');
const router = express.Router();
const studentController = require('./controllers/studentController')

//home
router.get('/', studentController.home)

//student
router.get('/authpage', studentController.authenticate)
router.get('/register', studentController.registerrr)
router.get('/registerpage', studentController.registerpage)
router.get('/login/:uname', studentController.dashboard)
router.get('/login/documentupload/:uname', studentController.documentupload)
router.get('/login/trackapplication/:uname', studentController.trackapplication)

router.post('/login', studentController.login)
router.post('/register', studentController.register)
router.post('/createaccount', studentController.createaccount)


//admin
router.get('/authpage_admin', studentController.authenticate_admin)
router.get('/register_admin', studentController.registerrr_admin)


module.exports = router;
