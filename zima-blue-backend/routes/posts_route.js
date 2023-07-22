const express = require("express");
const router = express.Router();

const { getAllPosts } = require("../controller/posts_controller");

router.route("/").get(getAllPosts);

module.exports = router;
