const MessageLimit = require("../models/messageLimit");

exports.index = async (req, res, next) => {
  const userId = String(req.user._id);

  const messageLimits = await MessageLimit.find({ user: userId });

  res.success({
    messageLimits,
  });
};
