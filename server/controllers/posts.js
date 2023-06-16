const Post = require("../models/Post");
const imageUpload = require("../services/imageUpload");

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("creator").populate("comments");
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
    const postObj = {
      ...req.body,
      creator: creator,
    };
    if (file) {
      const downloadUrl = await imageUpload(file, creator.username, "post");
      postObj.imageUrl = downloadUrl;
    }
    const post = new Post(postObj);

    creator.posts.push(post);
    const savedPost = await post.save();
    await creator.save();
    res.status(201).json(savedPost);
  } catch (e) {
    next(e);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200);
  } catch (e) {
    next(e);
  }
};

const likePosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currUser = req.user;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(currUser._id);
    if (isLiked) {
      post.likes.delete(currUser._id);
    } else {
      post.likes.set(currUser._id, true);
    }
    const likedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    ).populate("creator");
    res.status(200).json(likedPost);
  } catch (e) {
    next(e);
  }
};

const getUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ creator: userId });
    res.status(200).json(posts);
  } catch (e) {
    next(e);
  }
};

const getFeed = async (req, res, next) => {
  try {
    const user = req.user;
    const posts = await Post.find({
      creator: { $in: user.friends },
    });
    res.status(200).json(posts);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  likePosts,
  getUserPosts,
  getFeed,
};
