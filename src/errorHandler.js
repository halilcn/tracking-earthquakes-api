const { BadRequestError } = require("./errors");
const { isCustomError } = require("./utils");

module.exports = (err, req, res, next) => {
  const _isCustomError = isCustomError(err);
  if (!_isCustomError) console.error("Error:", err);

  const { status, message, data } = _isCustomError
    ? err
    : new BadRequestError("An unknown error occurred");

  res.status(status).json({
    message,
    status,
    ...(data && { data }),
  });
};
