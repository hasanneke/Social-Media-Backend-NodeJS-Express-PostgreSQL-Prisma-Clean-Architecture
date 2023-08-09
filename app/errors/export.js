const BadRequestError = require('./bad-request-error');
const NotFoundError = require('./not-found');
const CustomAPIError = require('./custom-error');
const UnAuthenticatedError = require('./unauthenticated-error');
const ConflictError = require('./conflict-error');
const ForbiddenError = require('./already-exist');
const UnAuthorizedError = require('./unauthorized-error');
module.exports = {
  BadRequestError,
  NotFoundError,
  CustomAPIError,
  UnAuthenticatedError,
  ConflictError,
  ForbiddenError,
  UnAuthorizedError,
};
