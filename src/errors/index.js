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

exports.UnprocessableEntity = class UnprocessableEntity extends CustomError {
  constructor({ message = "Fields are unprocessable", data }) {
    super(message);
    this.status = StatusCodes.UNPROCESSABLE_ENTITY;
    this.data = data;
  }
};

exports.UnauthorizedError = class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized error") {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
};
