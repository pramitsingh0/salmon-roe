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
const toggleFollow = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    const user = req.user;
    const friend = await User.findById(friendId);
    if (user.following.includes(friendId)) {
      user.following = user.following.filter(
        (person) => person._id.toString() != friendId
      );
      friend.followers = friend.followers.filter(
        (person) => person._id.toString() != user._id.toString()
      );
    } else {
      user.following.push(friend);
      friend.followers.push(user);
    }
    const updatedUser = await user.save();
    await friend.save();
    res.status(200).send(updatedUser);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCurrentUser,
  getUser,
  toggleFollow,
};
