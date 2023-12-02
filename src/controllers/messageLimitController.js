const MessageLimit = require("../models/messageLimit");

exports.index = async (req, res, next) => {
  const userId = String(req.user._id);

  const { token } = await MessageLimit.findOne({ user: userId });

  res.success({
    messageLimits: {
      token,
    },
  });
};
