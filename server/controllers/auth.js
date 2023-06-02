const User = require("../models/User");
const bcrypt = require("bcrypt");
const imageUpload = require("../services/imageUpload");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../services/config");

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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Inavlid Credentials" });
    }
    let token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    req.session.cookie.isLoggedIn = true;
    req.session.cookie.token = token;
    return res.status(200).json({
      token: token,
      ...user,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const logout = (req, res, next) => {
  req.session.destroy((e) => {
    console.log(e);
  });
  return res.json({ message: "Logged Out" });
};

module.exports = {
  createAccount,
  login,
  logout,
};
