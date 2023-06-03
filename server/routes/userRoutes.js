const express = require("express");
const { getCurrentUser, getUser } = require("../controllers/user");
const userRouter = express.Router();

userRouter.get("/", getCurrentUser);
userRouter.get("/:id", getUser);

module.exports = userRouter;
