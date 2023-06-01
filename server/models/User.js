const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    profileImageUrl: {
      type: String,
      default:
        "https://t0.gstatic.com/images?q=tbn:ANd9GcSLjgzNXwdx8i6MpWP3v34obkH6E8_MECNh6J8jjvQ45m55Az63",
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
