const { StatusCodes } = require("http-status-codes");

class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}
exports.CustomError = CustomError;

exports.BadRequestError = class BadRequestError extends CustomError {
  constructor(message = "An error occurred") {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
  }
};
