const express = require('express');

const router = express.Router();

const CategoryController = require('../controllers/category');

const auth = require('../middlewares/auth');

router.post('/categories', auth, CategoryController.createCategory);

router.get('/categories', auth, CategoryController.getAllCategory);

module.exports = router;