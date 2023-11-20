const Message = require("../models/message");

exports.store = async (req, res, next) => {
  const { owner, content } = req.body;

  await Message.create({
    owner,
    content,
    user: req.user._id,
  });

  res.success({
    status: 201,
    message: "created",
  });
};

exports.index = async (req, res, next) => {
  const userId = String(req.user._id);

  const allMessages = await Message.find({ user: userId });

  res.success({
    messages: allMessages,
  });
};
