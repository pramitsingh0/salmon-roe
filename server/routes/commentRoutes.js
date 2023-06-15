const express = require("express");
const {
  tokenExtractor,
  userExtractor,
} = require("../middleware/userExtractor");
const { createNewComment } = require("../controllers/comments");
const commentRouter = express.Router();

commentRouter.post(
  "/new/:postId",
  tokenExtractor,
  userExtractor,
  createNewComment
);

module.exports = commentRouter;
