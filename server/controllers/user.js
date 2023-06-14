const User = require("../models/User");

const getCurrentUserFriends = async (req, res, next) => {
  try {
    const { friends } = await User.findById(req.user._id).populate("friends");
    res.status(200).json(friends);
  } catch (e) {
    return next(e);
  }
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
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(
        (person) => person._id.toString() != friendId
      );
      friend.friends = friend.friends.filter(
        (person) => person._id.toString() != user._id.toString()
      );
    } else {
      user.friends.push(friend);
      friend.friends.push(user);
    }
    const updatedUser = await user.save();
    await friend.save();
    res.status(200).send(updatedUser);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCurrentUserFriends,
  getUser,
  toggleFollow,
};
