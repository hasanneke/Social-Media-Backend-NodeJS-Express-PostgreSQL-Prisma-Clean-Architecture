const express = require("express");
const router = express.Router();

const { login, register } = require("../controller/auth_controller");

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
