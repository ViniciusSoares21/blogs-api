const CategoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }

    const category = await CategoryService.createCategory(name);

    return res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getAllCategory = async (_req, res) => {
  try {
    const categorys = await CategoryService.getAllCategory();

    res.status(200).json(categorys);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
};