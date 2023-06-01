const User = require("../models/User");
const bcrypt = require("bcrypt");
const imageUpload = require("../services/imageUpload");

const createAccount = async (req, res, next) => {
  try {
    const file = req.file;
    const userData = req.body.user;
    const downloadUrl = await imageUpload(file, userData.username, "avatar");
    const passwordHash = await bcrypt.hash(userData.password, 10);
    const newUser = new User({
      ...userData,
      password: passwordHash,
      profileImageUrl: downloadUrl,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  createAccount,
};
