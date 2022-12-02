require('dotenv/config');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'secretJWT';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const getByUserEmail = (email) => User.findOne({ where: { email } });

const createUser = async (values) => {
  const { displayName, email, password, image } = values;

  const newUser = await User.create({ displayName, email, password, image });

  const { password: _, ...userWithPassword } = newUser.dataValues;

  const token = jwt.sign({ data: userWithPassword }, secret, jwtConfig);

  return token;
};

const getUser = async () => {
  const users = await User.findAll({ attributes: { exclude:
    ['password'] } });

  return users;
};

const getByIdUser = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude:
    ['password'] } });
  return user;
};

const deletUser = (id) => User.destroy({ where: { id } });

module.exports = {
  getByUserEmail,
  createUser,
  getUser,
  getByIdUser,
  deletUser,
};
