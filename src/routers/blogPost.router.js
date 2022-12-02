const express = require('express');

const router = express.Router();

const BlogPost = require('../controllers/blogPost');

const auth = require('../middlewares/auth');

const validatePost = require('../middlewares/validatePost');

router.post('/post', auth, validatePost, BlogPost.createPost);

module.exports = router;