const { Category } = require('../models');

const getByName = async (name) => Category.findOne({ where: { name } });

const createCategory = async (name) => {
  await Category.create({ name });

  const category = await getByName(name);

  return category;
};

module.exports = {
  createCategory,
};
