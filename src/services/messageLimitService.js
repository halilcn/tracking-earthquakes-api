const { BadRequestError } = require("openai");
const MessageLimit = require("../models/messageLimit");
const { DEFAULT_MESSAGE_TOKEN_LIMIT } = require("../constants");

exports.checkHasMessageLimit = async (payload) => {
  const { messageLimit, user } = payload;

  const currentMessageLimit =
    messageLimit || (await MessageLimit.findOne({ user }));
  if (!currentMessageLimit) return;

  return currentMessageLimit.token > 0;
};

exports.reduceMessageLimit = async (payload) => {
  const { messageLimit, user, totalPromptUsage } = payload;

  const currentMessageLimit =
    messageLimit || (await MessageLimit.findOne({ user }));
  if (!currentMessageLimit)
    throw new BadRequestError("There are not any message limits");

  const currentToken =
    Number(currentMessageLimit.token) - Number(totalPromptUsage);

  return await MessageLimit.findOneAndUpdate({ user }, { token: currentToken });
};

exports.createDefaultMessageLimits = async (payload) => {
  const { user } = payload;
  return await MessageLimit.create({
    user,
    token: DEFAULT_MESSAGE_TOKEN_LIMIT,
  });
};
