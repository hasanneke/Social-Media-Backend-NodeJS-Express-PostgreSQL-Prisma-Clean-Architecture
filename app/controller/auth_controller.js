const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleware/async");
const { registerRequest, loginRequest } = require("../services/auth.service");

const register = asyncWrapper(async (req, res) => {
  const response = await registerRequest(req);
  res.status(StatusCodes.CREATED).json(response);
});

const login = asyncWrapper(async (req, res) => {
  const response = await loginRequest(req);

  res.status(StatusCodes.OK).json(response);
});

module.exports = { login, register };
