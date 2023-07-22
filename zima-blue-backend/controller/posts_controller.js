const { PrismaClient } = require("@prisma/client");
const asyncWrapper = require("../middleware/async");
const prisma = new PrismaClient();

const getAllPosts = asyncWrapper((req, res) => {
  const posts = prisma.post.findMany();
  res.status(200).json({ posts });
});

module.exports = { getAllPosts };
