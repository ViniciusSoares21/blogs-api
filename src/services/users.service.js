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

module.exports = {
  getByUserEmail,
  createUser,
};
