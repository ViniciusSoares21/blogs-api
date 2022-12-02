const { BlogPost, PostCategory, User, Category } = require('../models');

const getById = (id) => BlogPost.findOne({ where: { id } });

const getPost = async () => {
  const post = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return post;
};

const createPost = async (title, content, categoryIds, id) => {
  const obj = {
    title,
    content,
    userId: id,
    published: new Date(),
    updated: new Date(),
  };

  const newPost = await BlogPost.create(obj);

  await categoryIds.map((category) => PostCategory
    .create({ postId: newPost.id, categoryId: category }));

  const post = await getById(newPost.id);

  return post;
};

module.exports = {
  createPost,
  getPost,
};
