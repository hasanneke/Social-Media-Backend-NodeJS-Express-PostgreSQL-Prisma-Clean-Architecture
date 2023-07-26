const express = require("express");
const postsRouter = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
} = require("../controller/posts_controller");
const { authMiddleWare } = require("../middleware");

postsRouter.route("/").get(getAllPosts).post(createPost, authMiddleWare);
postsRouter.route("/:id").get(getPost);
module.exports = postsRouter;
