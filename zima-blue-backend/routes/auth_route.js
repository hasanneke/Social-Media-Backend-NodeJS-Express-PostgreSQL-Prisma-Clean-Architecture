const express = require("express");
const authRouter = express.Router();

const { login, register } = require("../controller/auth_controller");

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);

module.exports = authRouter;
