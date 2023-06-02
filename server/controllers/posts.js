const Post = require("../models/Post");
const imageUpload = require("../services/imageUpload");

const getAllPosts = async (req, res, next) => {
  try {
    const posts = Post.find({});
    return res.status(200).json({
      posts,
    });
  } catch (e) {
    next(e);
  }
};
const createPost = async (req, res, next) => {
  try {
    const creator = req.user;
    const file = req.file;
    const downloadUrl = await imageUpload(file, creator.username, "post");
    const post = new Post({
      ...req.body.post,
      creator: creator,
      imageUrl: downloadUrl,
    });
    creator.posts.push(post);
    const savedPost = await post.save();
    await creator.save();
    res.status(201).json(savedPost);
  } catch (e) {
    next(e);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const userId = user._id.toString();
    const post = await Post.findById(id);
    const creatorId = post.creator._id.toString();
    let downloadUrl = "";
    if (userId != creatorId) {
      return res.status(401).json({
        error: "Authorization Error",
      });
    }
    const updatedContent = req.body.post;
    const updatedFile = req.file;
    if (updatedFile) {
      downloadUrl = await imageUpload(updatedFile, user.username, "post");
    }
    if (downloadUrl) {
      updatedContent.imageUrl = downloadUrl;
    }
    const updatedPost = await Post.findByIdAndUpdate(id, updatedContent, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  editPost,
};
