const Comments = require("../models/Comments");
const Post = require("../models/Post");

const createNewComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const commentContent = req.body.comment;
    const newComment = new Comments({
      post: post,
      comment: commentContent,
      commenter: req.user,
    });
    post.comments.push(newComment);
    await newComment.save();
    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("creator")
      .populate("comments");

    res.status(201).json(updatedPost);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  createNewComment,
};
