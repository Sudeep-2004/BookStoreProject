const express = require('express');
const router = express.Router();
const {signup, login} = require('../controller/authController');
const {signupValidation, loginValidation} = require('../middleware/authValidation')

router.post('/login',loginValidation, login);

router.post('/signup',signupValidation, signup);

module.exports = router;   