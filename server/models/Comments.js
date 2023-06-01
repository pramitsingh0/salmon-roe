const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", commentSchema);
