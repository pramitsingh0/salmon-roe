const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../services/config");
const User = require("../models/User");
const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      error: "User Unauthorized",
    });
  }
  if (authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1];
    req.token = token;
  }
  next();
  return null;
};

const userExtractor = async (req, res, next) => {
  try {
    const payload = jwt.verify(req.token, JWT_SECRET);
    req.user = await User.findById(payload.userId);
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      error: "User Unauthorized/User not Found",
    });
  }
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
