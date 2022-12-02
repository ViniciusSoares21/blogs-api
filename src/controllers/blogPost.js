const BlogPostService = require('../services/blogPost.services');
const CategoryService = require('../services/category.service');

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
    const email = 'lewishamilton@gmail.com';
    const posts = await BlogPostService.getPost(email);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  createPost,
  getPost,
};
