const express = require("express");
const {
  getCurrentUser,
  getUser,
  toggleFollow,
} = require("../controllers/user");
const {
  tokenExtractor,
  userExtractor,
} = require("../middleware/userExtractor");
const userRouter = express.Router();

userRouter.get("/", getCurrentUser);
userRouter.get("/:id", getUser);
userRouter.put(
  "/:id/follow/:friendId",
  tokenExtractor,
  userExtractor,
  toggleFollow
);

module.exports = userRouter;
