const { MESSAGE_OWNERS } = require("../constants");
const Message = require("../models/message");

exports.createAiMessage = async (payload) => {
  const { type, content, user } = payload;

  const createdMessage = await Message.create({
    type,
    content,
    user,
    owner: MESSAGE_OWNERS.ai,
  });

  return createdMessage;
};

exports.createUserMessage = async (payload) => {
  const { type, content, user } = payload;

  return await Message.create({
    type,
    content,
    user,
    owner: MESSAGE_OWNERS.user,
  });
};
