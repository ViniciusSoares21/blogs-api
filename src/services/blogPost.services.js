const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const getById = (id) => BlogPost.findOne({ where: { id } });

const getByIdpost = (id) => {
  const post = BlogPost.findOne({ where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return post;
};

const getPost = async () => {
  const post = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return post;
};

const searchPostTitle = async (q) => {
  const post = await BlogPost.findAll({ where: { [Op.or]: {
     title: { [Op.substring]: q }, 
     content: { [Op.substring]: q } } },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return post;
}; 

/* 
const searchPostTitle = async (q) => {
  const postTitle = await getPost();

  if (!q) {
    return postTitle;
  }

  const filterPostTitle = postTitle.filter((elem) => elem.title.toLowerCase()
    .includes(q.toLowerCase()));

  const filterContent = postTitle.filter((elem) => elem.content.toLowerCase()
  .includes(q.toLowerCase()));

  if (filterPostTitle.length === 0) {
    return filterContent;
  }

  if (filterContent.length === 0) {
    return filterPostTitle;
  }
};
 */
const updatedPost = async (title, content, id) => {
  await BlogPost.update({ title, content }, {
    where: { id },
  });
  const upPost = await getByIdpost(id);

  return upPost;
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

const deletPost = (id) => BlogPost.destroy({ where: { id } });

module.exports = {
  createPost,
  getPost,
  getByIdpost,
  updatedPost,
  deletPost,
  getById,
  searchPostTitle,
};
