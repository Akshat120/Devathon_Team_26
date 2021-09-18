const express = require('express');
const router = express.Router();
const studentController = require('./controllers/studentController')

router.get('/',studentController.home)
router.get('/registerpage',studentController.registerpage)

router.post('/register',studentController.register)
router.post('/login',studentController.login)

module.exports = router;
