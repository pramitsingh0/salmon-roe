const Comments = require("../models/Comments");
const Post = require("../models/Post");

const createNewComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const commentContent = req.body;
    const newComment = new Comments({
      post: post,
      comment: commentContent,
      commenter: req.user,
    });
    post.comments.push(newComment);
    const createdComment = await newComment.save();
    await post.save();
    res.status(201).json(createdComment);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createNewComment,
};
