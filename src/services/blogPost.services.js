const snakeize = require('snakeize');
const { BlogPost, PostCategory } = require('../models');

const getById = (id) => BlogPost.findOne({ where: { id } });

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
    .create(snakeize({ postId: newPost.id, categoryId: category })));

  const post = await getById(newPost.id);

  return post;
};

module.exports = {
  createPost,
};
