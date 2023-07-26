const { PrismaClient } = require("@prisma/client");
const asyncWrapper = require("../middleware/async");
const NotFoundError = require("../errors/not-found");
const { StatusCodes } = require("http-status-codes");
const { post } = require("../routes/auth_route");
const prisma = new PrismaClient();

const getAllPosts = asyncWrapper((req, res) => {
  const posts = prisma.post.findMany();
  res.status(200).json({ posts });
});

const getPost = asyncWrapper(async (req, res) => {
  const { id: postId } = req.params;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });
  if (!post) {
    throw new NotFoundError("Post Not Found");
  }
  res.status(StatusCodes.OK).json({ post });
});

const createPost = asyncWrapper(async (req, res) => {
  const { user, body: payload } = req;
  const post = await prisma.post.create({
    data: {
      authorId: user.userId,
      ...payload,
    },
  });
  res.status(StatusCodes.CREATED).json(post);
});

const deletePost = asyncWrapper(async (req, res) => {});
module.exports = { getAllPosts, getPost, createPost };
