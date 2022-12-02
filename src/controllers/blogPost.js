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

module.exports = {
  createPost,
  getPost,
  getByIdpost,
};
