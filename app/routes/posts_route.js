const express = require("express");
const postsRouter = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
} = require("../controller/posts_controller");
const { authMiddleWare } = require("../middleware");

postsRouter.route("/").get(getAllPosts).post(authMiddleWare, createPost);
postsRouter.route("/:id").get(getPost).delete(authMiddleWare, deletePost);
module.exports = postsRouter;
