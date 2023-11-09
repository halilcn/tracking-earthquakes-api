const { BadRequestError } = require("./errors");
const { isCustomError } = require("./utils");

module.exports = (err, req, res, next) => {
  const { status, message, data } = isCustomError(err)
    ? err
    : new BadRequestError("An unknown error occurred");

  res.status(status).json({
    message,
    status,
    ...(data && { data }),
  });
};
