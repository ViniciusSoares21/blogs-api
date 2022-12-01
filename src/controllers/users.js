const UserService = require('../services/users.service');

const createUser = async (req, res) => {
  try {
    const token = await UserService.createUser(req.body);

    res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getUser = async (_req, res) => {
  try {
    const users = await UserService.getUser();
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getByIdUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserService.getByIdUser(id);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  createUser,
  getUser,
  getByIdUser,
};
