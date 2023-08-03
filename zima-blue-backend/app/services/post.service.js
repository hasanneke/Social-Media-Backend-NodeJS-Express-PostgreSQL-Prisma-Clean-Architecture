const { PrismaClient } = require('@prisma/client');

const {
  ConflictError,
  NotFoundError,
  BadRequestError,
  UnAuthorizedError,
} = require('../errors/export');
const client = new PrismaClient();

const buildFindAllQuery = query => {
  const queries = [];

  if ('tag' in query) {
    queries.push({
      tagList: {
        some: {
          name: query.tag,
        },
      },
    });
  }
  return queries;
};

const getPosts = async query => {
  const andQueries = buildFindAllQuery(query);
  const postsCount = await client.post.count();
  const posts = await client.post.findMany({
    where: { AND: andQueries },
    orderBy: {
      createdAt: 'desc',
    },
    skip: Number(query.offset) || 0,
    take: Number(query.limit) || 10,
    include: {
      tags: {
        select: {
          name: true,
        },
      },
    },
  });

  return { count: postsCount, data: posts };
};

const getPostRequest = async postId => {
  const post = await client.post.findUnique({
    where: {
      id: Number(postId),
    },
    include: {
      tags: true,
    },
  });
  if (!post) {
    throw new NotFoundError('Post Not Found');
  }
  return post;
};
const createPostRequest = async req => {
  const {
    user,
    body: { title, content, tagList },
  } = req;
  const tags = Array.isArray(tagList) ? tagList : [];
  if (!title) {
    throw new BadRequestError('Title cannot be empty');
  }
  if (!content) {
    throw new BadRequestError('Content cannot be empty');
  }
  const post = await client.post.create({
    data: {
      authorId: user.userId,
      title: title,
      content: content,
      tags: {
        connectOrCreate: tags.map(tag => ({
          create: { name: tag },
          where: { name: tag },
        })),
      },
    },
  });
  return post;
};

const deletePostRequest = async (user, id) => {
  const findPost = await client.post.findUnique({
    where: { id: Number(id) },
  });
  if (!findPost) {
    throw new NotFoundError('No post found with this id');
  }
  if (findPost.authorId === user.userId) {
    const deletedPost = await client.post.delete({
      where: { id: Number(id) },
    });
    return deletedPost;
  } else {
    throw new UnAuthorizedError("You don't own this post");
  }
};

module.exports = {
  getPosts,
  getPostRequest,
  createPostRequest,
  deletePostRequest,
};
