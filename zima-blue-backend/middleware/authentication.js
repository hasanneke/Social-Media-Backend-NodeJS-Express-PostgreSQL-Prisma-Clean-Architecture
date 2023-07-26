const jwt = require("jsonwebtoken");
const UnAuthenticatedError = require("../errors/unauthenticated-error");
const asyncWrapper = require("./async");

const authMiddleWare = asyncWrapper(async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  // attach the user to the job routes
  req.user = { userId: payload.userId };
  next();
});

module.exports = authMiddleWare;
