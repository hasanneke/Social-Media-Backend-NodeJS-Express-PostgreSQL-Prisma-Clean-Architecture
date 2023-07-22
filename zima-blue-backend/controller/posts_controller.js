const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPosts };
