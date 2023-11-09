const { UnauthorizedError } = require("../errors");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const token = req.headers["token"] || "";

  const user = await User.findOne({ token });
  if (!user) return next(new UnauthorizedError());

  req.user = user;
  next();
};
