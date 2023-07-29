const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-error");

class ConflictError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}
module.exports = ConflictError;
