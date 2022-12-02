const express = require('express');

const router = express.Router();

const usersRouter = require('./users.router');
const categoryRouter = require('./category.router');
const blogPostRouter = require('./blogPost.router');

router.use(usersRouter);
router.use(categoryRouter);
router.use(blogPostRouter);

module.exports = router;