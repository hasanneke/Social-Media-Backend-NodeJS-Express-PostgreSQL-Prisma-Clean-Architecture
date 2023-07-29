const { PrismaClient } = require("@prisma/client");

const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../errors/export");
const client = new PrismaClient();
const getPosts = async (query) => {
  const postsCount = await client.post.count();
  const posts = await client.post.findMany();

  return { count: postsCount, data: posts };
};

const getPostRequest = async (postId) => {
  const post = await client.post.findUnique({
    where: {
      id: Number(postId),
    },
  });
  if (!post) {
    throw new NotFoundError("Post Not Found");
  }
  return post;
};
const createPostRequest = async (req) => {
  const {
    user,
    body: { title, content },
  } = req;
  if (!title) {
    throw new BadRequestError("Title cannot be empty");
  }
  if (!content) {
    throw new BadRequestError("Content cannot be empty");
  }
  const post = await client.post.create({
    data: {
      authorId: user.userId,
      title: title,
      content: content,
    },
  });
  return post;
};
const deletePostRequest = async (user, id) => {
  const findPost = await client.post.findUnique({
    where: { id: Number(id) },
  });
  if (!findPost) {
    throw new NotFoundError("No post found with this id");
  }
  if (findPost.authorId === user.userId) {
    const deletedPost = await client.post.delete({
      where: { id: Number(id) },
    });
    return deletedPost;
  } else {
    throw new ConflictError("You don't own this post");
  }
};

module.exports = {
  getPosts,
  getPostRequest,
  createPostRequest,
  deletePostRequest,
};
