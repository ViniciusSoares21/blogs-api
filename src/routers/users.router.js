const express = require('express');

const router = express.Router();

const LoginController = require('../controllers/login');
const UserController = require('../controllers/users');

const validateName = require('../middlewares/validateName');
const validatePassword = require('../middlewares/validatePassword');
const validateEmail = require('../middlewares/validateEmail');

router.post('/login', LoginController);

router.post('/user', validateName, validatePassword, validateEmail, UserController.createUser);

module.exports = router;