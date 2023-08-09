const { PrismaClient } = require('@prisma/client');
const { BadRequestError, ForbiddenError } = require('../errors/export');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const generateToken = require('../utils/token.utils');

const checkUserUniqueness = async email => {
  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (existingUserByEmail) {
    throw new ForbiddenError('email has already been taken');
  }
};

const registerRequest = async req => {
  let { email, password } = req.body;

  if (!email) {
    throw new BadRequestError("email can't be blank");
  }
  await checkUserUniqueness(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      profile: {
        create: {
          bio: 'I like flowers',
        },
      },
    },
  });
  const token = generateToken(user);
  return { ...user, token: token };
};

const loginRequest = async req => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError("email can't be blank");
  }
  if (!password) {
    throw new BadRequestError("password can't be blank");
  }
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      password: true,
      email: true,
      name: true,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return {
        email: user.email,
        bio: user.bio,
        name: user.name,
        token: generateToken(user),
      };
    }
  }
  throw new ForbiddenError('email or password is invalid');
};
module.exports = { registerRequest, loginRequest };
