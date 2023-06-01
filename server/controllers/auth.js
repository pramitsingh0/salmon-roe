const User = require("../models/User");
const bcrypt = require("bcrypt");

const createAccount = async (req, res, next) => {
  const userData = req.body.user;
  const passwordHash = await bcrypt.hash(userData.password, 10);
  const newUser = new User({
    ...userData,
    password: passwordHash,
  });
  await newUser.save();
  res.status(201).json(newUser);
};

module.exports = {
  createAccount,
};
