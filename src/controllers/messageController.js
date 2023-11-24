const { BadRequestError } = require("../errors");
const Message = require("../models/message");
const messageService = require("../services/messageService");
const messageLimitService = require("../services/messageLimitService");
const MessageLimit = require("../models/messageLimit");

// TODO: need transaction
// TODO: add logger
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

  // TODO: AI generator
  const answerOfQuestion = "fake-ai-answer";
  const createdMessage = await messageService.createAiMessage({
    type,
    content: answerOfQuestion,
    user: req.user._id,
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
