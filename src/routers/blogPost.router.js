const express = require('express');

const router = express.Router();

const BlogPost = require('../controllers/blogPost');

const auth = require('../middlewares/auth');

const validatePost = require('../middlewares/validatePost');

router.post('/post', auth, validatePost, BlogPost.createPost);

router.get('/post', auth, BlogPost.getPost);

router.get('/post/:id', auth, BlogPost.getByIdpost);

router.put('/post/:id', auth, BlogPost.updatedPost);

module.exports = router;