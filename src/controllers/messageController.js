const { BadRequestError } = require("../errors");
const Message = require("../models/message");
const MessageLog = require("../models/messageLog");
const messageService = require("../services/messageService");
const messageLimitService = require("../services/messageLimitService");
const MessageLimit = require("../models/messageLimit");
const aiService = require("../services/aiService");
const { MESSAGE_TYPES } = require("../constants");
const {
  getGeneralMessagePrompt,
  getEarthquakeMessagePrompt,
} = require("../utils/prompts");

const getPromptByMessageType = (type) =>
  ({
    [MESSAGE_TYPES.general]: getGeneralMessagePrompt(),
    [MESSAGE_TYPES.earthquake]: getEarthquakeMessagePrompt(),
  }[type]);

// TODO: need transaction
exports.store = async (req, res, next) => {
  const userId = String(req.user._id);
  const { content, type } = req.body;

  let messageLimits = await MessageLimit.findOne({ user: userId });
  if (!messageLimits) {
    messageLimits = await messageLimitService.createDefaultMessageLimits({
      user: userId,
    });
  }

  const hasMessageLimit = await messageLimitService.checkHasMessageLimit({
    user: userId,
    messageLimits,
    type,
  });
  if (!hasMessageLimit) throw new BadRequestError("Not enough message limit");

  await messageService.createUserMessage({
    content,
    type,
    user: userId,
  });

  await messageLimitService.reduceMessageLimit({
    user: userId,
    type,
    messageLimits,
  });

  const answer = await aiService.askQuestion({
    prompt: getPromptByMessageType(type),
    question: content,
  });
  const createdMessage = await messageService.createAiMessage({
    type,
    content: answer.choices[0].message.content,
    user: userId,
  });

  await MessageLog.create({
    user: userId,
    message: createdMessage._id,
    logs: {
      openai: answer,
    },
  });

  res.success({
    status: 201,
    message: createdMessage,
  });
};

exports.index = async (req, res, next) => {
  const userId = String(req.user._id);

  const allMessages = await Message.find({ user: userId });

  res.success({
    messages: allMessages,
  });
};
