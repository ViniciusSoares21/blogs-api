const express = require('express');

const router = express.Router();

const usersRouter = require('./users.router');
const categoryRouter = require('./category.router');

router.use(usersRouter);
router.use(categoryRouter);

module.exports = router;