const UserService = require('../services/users.service');

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const validEmail = /\S+@\S+\.\S+/;

  if (!validEmail.test(email)) {
    return res.status(400).json(
      { message: '"email" must be a valid email' },
    );
  }

  const user = await UserService.getByUserEmail(email);

  if (user !== null) {
    return res.status(409).json(
      { message: 'User already registered' },
    );
  }

  next();
};