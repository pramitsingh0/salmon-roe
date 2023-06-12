const express = require("express");
const {
  getCurrentUserFriends,
  getUser,
  toggleFollow,
} = require("../controllers/user");
const {
  tokenExtractor,
  userExtractor,
} = require("../middleware/userExtractor");
const userRouter = express.Router();

userRouter.get(
  "/friends",
  tokenExtractor,
  userExtractor,
  getCurrentUserFriends
);
userRouter.get("/:id", getUser);
userRouter.patch(
  "/follow/:friendId",
  tokenExtractor,
  userExtractor,
  toggleFollow
);

module.exports = userRouter;
