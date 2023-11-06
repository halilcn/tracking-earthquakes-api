const { StatusCodes } = require("http-status-codes");

// TODO: it it is not custom error, dont return correct text?
// TODO: it is broken?
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
