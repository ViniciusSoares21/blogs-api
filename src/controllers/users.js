const UserService = require('../services/users.service');

const createUser = async (req, res) => {
  try {
    const token = await UserService.createUser(req.body);

    res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  createUser,
};
