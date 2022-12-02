const { Category } = require('../models');

const getByName = (name) => Category.findOne({ where: { name } });

const getById = (categoryIds) => Category.findOne({
  where: { id: categoryIds },
});

const getAllCategory = () => Category.findAll();

const createCategory = async (name) => {
  await Category.create({ name });

  const category = await getByName(name);

  return category;
};

module.exports = {
  createCategory,
  getAllCategory,
  getById,
};
