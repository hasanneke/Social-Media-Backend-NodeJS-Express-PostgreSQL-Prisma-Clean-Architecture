const express = require("express");
const postsRouter = express.Router();

const { getAllPosts } = require("../controller/posts_controller");

postsRouter.route("/").get(getAllPosts);

module.exports = postsRouter;
