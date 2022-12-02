require('dotenv/config');
const jwt = require('jsonwebtoken');

const UserService = require('../services/users.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
     const payload = jwt.verify(token, secret);

     const user = await UserService.getByUserEmail(payload.data.email);

     req.use = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};