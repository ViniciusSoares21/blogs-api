const express = require('express');

const router = express.Router();

const LoginController = require('../controllers/login');
const UserController = require('../controllers/users');

const validateName = require('../middlewares/validateName');
const validatePassword = require('../middlewares/validatePassword');
const validateEmail = require('../middlewares/validateEmail');
const auth = require('../middlewares/auth');

router.get('/user', auth, UserController.getUser);

router.get('/user/:id', auth, UserController.getByIdUser);

router.post('/login', LoginController);

router.post('/user', validateName, validatePassword, validateEmail, UserController.createUser);

router.delete('/user/me', auth, UserController.deletUser);

module.exports = router;