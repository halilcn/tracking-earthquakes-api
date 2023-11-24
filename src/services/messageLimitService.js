const { BadRequestError } = require("openai");
const { mappingLimitTypesFromTypes } = require("../constants");
const MessageLimit = require("../models/messageLimit");

const getMappingLimitFieldFromMessageType = (type) =>
  mappingLimitTypesFromTypes[type];

exports.checkHasMessageLimit = async (payload) => {
  const { messageLimits, user, type } = payload;

  const currentMessageLimits =
    messageLimits || (await MessageLimit.findOne({ user }));
  if (!currentMessageLimits) return;

  return currentMessageLimits[getMappingLimitFieldFromMessageType(type)] > 0;
};

exports.reduceMessageLimit = async (payload) => {
  const { messageLimits, user, type } = payload;

  const currentMessageLimits =
    messageLimits || (await MessageLimit.findOne({ user }));
  if (!currentMessageLimits)
    throw new BadRequestError("There are not any message limits");

  const messageLimitField = getMappingLimitFieldFromMessageType(type);
  const currentValue = currentMessageLimits[messageLimitField];

  return await MessageLimit.findOneAndUpdate(
    { user },
    { [messageLimitField]: currentValue - 1 }
  );
};

exports.createDefaultMessageLimits = async (payload) => {
  const { user } = payload;
  return await MessageLimit.create({ user });
};
