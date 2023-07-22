const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.create({ email });
  const token = jwt.sign({ userId: user.id, email: user.email }, "jwtSecret", {
    expiresIn: "30d",
  });
  res.status(StatusCodes.CREATED).json({ user: user, token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    email: email,
    password: password,
  });
  const token = jwt.sign({ userId: user.id, email: user.email }, "jwtSecret", {
    expiresIn: "30d",
  });
  res.status(StatusCodes.OK).json({ user: user, token: token });
};

module.exports = { login, register };
