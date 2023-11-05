const { StatusCodes } = require("http-status-codes");

module.exports = (err, req, res, next) => {
  const {
    status = StatusCodes.BAD_REQUEST,
    message = "An unknown error occurred",
    data,
  } = err;

  res.status(status).json({
    message,
    status,
    ...(data && { data }),
  });
};
