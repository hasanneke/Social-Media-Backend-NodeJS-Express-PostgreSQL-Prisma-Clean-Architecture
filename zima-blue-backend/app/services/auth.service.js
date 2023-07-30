const { PrismaClient } = require("@prisma/client");
const { BadRequestError, NotFoundError } = require("../errors/export");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const registerRequest = async (req) => {
  let { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Provide an email and password");
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
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return { user: user, token: token };
};

const loginRequest = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Provide an email and password");
  }
  const user = await prisma.user.findUnique({
    where: { email: email, password: password },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found with this email and password");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return { user: user, token: token };
};
module.exports = { registerRequest, loginRequest };
