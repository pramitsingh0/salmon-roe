const mongoose = require("mongoose");

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
      unique: true,
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
    location: {
      type: String,
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
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "NA"],
      default: "NA",
    },
  },
  { timestamps: true }
);
// userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", userSchema);
