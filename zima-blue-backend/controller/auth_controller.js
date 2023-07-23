const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request-error");
const asyncWrapper = require("../middleware/async");
const bcrypt = require("bcrypt");
const register = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  if (!email || !password) {
    throw new BadRequestError("Provide an email");
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      password: password,
      profile: {
        create: {
          bio: "I like flowers",
        },
      },
    },
  });
  const token = jwt.sign(
    { userId: user.id, email: user.email, password: user.password },
    "jwtSecret",
    {
      expiresIn: "30d",
    }
  );
  res.status(StatusCodes.CREATED).json({ user: user, token: token });
});

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
