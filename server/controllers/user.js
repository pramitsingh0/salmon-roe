const User = require("../models/User");

const getCurrentUser = (req, res, next) => {
  return res.status(200).json(req.user);
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findById(id);
    res.status(200).json(foundUser);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCurrentUser,
  getUser,
};
