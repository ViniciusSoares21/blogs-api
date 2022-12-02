const express = require('express');

const router = express.Router();

const BlogPost = require('../controllers/blogPost');

const auth = require('../middlewares/auth');

const validatePost = require('../middlewares/validatePost');

router.get('/post/search', auth, BlogPost.searchPostTitle);

router.post('/post', auth, validatePost, BlogPost.createPost);

router.get('/post', auth, BlogPost.getPost);

router.get('/post/:id', auth, BlogPost.getByIdpost);

router.put('/post/:id', auth, BlogPost.updatedPost);

router.delete('/post/:id', auth, BlogPost.deletPost);

module.exports = router;