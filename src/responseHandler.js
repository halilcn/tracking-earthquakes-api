const { StatusCodes } = require("http-status-codes");

const handler =
  (res) =>
  (payload = {}) => {
    const { status = StatusCodes.OK, ...restOf } = payload;
    res.status(status).json({ status, data: restOf });
  };

module.exports = (_, res, next) => {
  res.success = handler(res);
  next();
};
