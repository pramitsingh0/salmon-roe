const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: {
      type: String,
      default: "",
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comments",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
