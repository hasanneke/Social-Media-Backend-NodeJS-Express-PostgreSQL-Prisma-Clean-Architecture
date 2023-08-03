const { PrismaClient } = require('@prisma/client');
const asyncWrapper = require('../middleware/async');
const NotFoundError = require('../errors/not-found');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad-request-error');
const {
  getPosts,
  getPostRequest,
  createPostRequest,
  deletePostRequest,
} = require('../services/post.service');
const prisma = new PrismaClient();

const getAllPosts = asyncWrapper(async (req, res) => {
  const posts = await getPosts(req.query);
  res.status(200).json(posts);
});

const getPost = asyncWrapper(async (req, res) => {
  const { id: postId } = req.params;
  const post = await getPostRequest(postId);
  res.status(StatusCodes.OK).json(post);
});

const createPost = asyncWrapper(async (req, res) => {
  const post = await createPostRequest(req);
  return res.status(StatusCodes.CREATED).json(post);
});

const deletePost = asyncWrapper(async (req, res) => {
  const { id: postId } = req.params;
  const deletedPost = await deletePostRequest(req.user, postId);
  return res.status(StatusCodes.OK).json(deletedPost);
});

module.exports = { getAllPosts, getPost, createPost, deletePost };
