const BlogPostService = require('../services/blogPost.services');
const CategoryService = require('../services/category.service');

const getByIdpost = async (req, res) => {
  try {
    const post = await BlogPostService.getByIdpost(req.params.id);

    if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Erro intern', error: err.message });
  }
};

const updatedPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const { id } = req.params;

    if (Number(req.use.id) !== Number(id)) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const upPost = await BlogPostService.updatedPost(title, content, id);
    res.status(200).json(upPost);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;

    const { id } = req.use;

    const validatCategorys = await Promise.all(categoryIds.map((category) => CategoryService
      .getById(category)));

    if (validatCategorys.includes(null)) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    const post = await BlogPostService.createPost(title, content, categoryIds, id);

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getPost = async (_req, res) => {
  try {
    const posts = await BlogPostService.getPost();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const searchPostTitle = async (req, res) => {
  const { q } = req.query;
  const result = await BlogPostService.searchPostTitle(q);

  return res.status(200).json(result);
};

const deletPost = async (req, res) => {
  try {
    const existPost = await BlogPostService.getById(req.params.id);

    if (existPost === null) {
      return res.status(404).json({ message: 'Post does not exist' });
      }

    if (Number(req.use.id) !== Number(existPost.userId)) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }   

    await BlogPostService.deletPost(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  createPost,
  getPost,
  getByIdpost,
  updatedPost,
  deletPost,
  searchPostTitle,
};
