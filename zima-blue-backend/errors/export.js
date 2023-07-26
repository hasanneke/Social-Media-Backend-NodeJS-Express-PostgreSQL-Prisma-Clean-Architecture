const BadRequestError = require("./bad-request-error");
const NotFoundError = require("./not-found");
const CustomAPIError = require("./custom-error");
const UnAuthenticatedError = require("./unauthenticated-error");
module.exports = {
  BadRequestError,
  NotFoundError,
  CustomAPIError,
  UnAuthenticatedError,
};
