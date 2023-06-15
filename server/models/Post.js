const mongoose = require("mongoose");
const Comments = require("./Comments");

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      default: "",
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comments",
    },
  },
  { timestamps: true }
);

postSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comments.deleteMany({ post: doc });
  }
});

module.exports = mongoose.model("Post", postSchema);
