const express = require("express");
const { getAllPosts, createPost, editPost } = require("../controllers/posts");
const {
  tokenExtractor,
  userExtractor,
} = require("../middleware/userExtractor");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("post");
global.XMLHttpRequest = require("xhr2");

router.get("/", getAllPosts);
router.post("/create", tokenExtractor, userExtractor, upload, createPost);
router.put("/:id/edit", tokenExtractor, userExtractor, upload, editPost);

module.exports = router;
