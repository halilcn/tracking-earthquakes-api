const { BadRequestError } = require("../errors");
const Message = require("../models/message");
const MessageLog = require("../models/messageLog");
const messageService = require("../services/messageService");
const messageLimitService = require("../services/messageLimitService");
const aiService = require("../services/aiService");
const { MESSAGE_TYPES } = require("../constants");
const {
  getGeneralMessagePrompt,
  getGeneralMessagePromptFunctions,
} = require("../utils/prompts");

// TODO: need transaction
exports.storeAiMessage = async (req, res, next) => {
  const userId = String(req.user._id);
  const messageType = MESSAGE_TYPES.general;
  const { content } = req.body;

  const hasMessageLimit = await messageLimitService.checkHasMessageLimit({
    user: userId,
  });
  if (!hasMessageLimit) throw new BadRequestError("Not enough message limit");

  const createdUserMessage = await messageService.createUserMessage({
    content,
    type: messageType,
    user: userId,
  });

  const answer = await aiService.askQuestion({
    prompt: getGeneralMessagePrompt(),
    question: content,
    functions: getGeneralMessagePromptFunctions(),
  });

  const totalPromptUsage = answer.usage.total_tokens;
  await messageLimitService.reduceMessageLimit({
    user: userId,
    messageLimit,
    totalPromptUsage,
  });

  const functionCall = answer.choices[0].message?.function_call;
  if (!!functionCall) {
    await MessageLog.create({
      user: userId,
      receivedMessage: createdUserMessage._id,
      logs: {
        openai: answer,
      },
    });

    return res.success({
      status: 201,
      functionCall,
      totalPromptUsage,
    });
  }

  const createdAiMessage = await messageService.createAiMessage({
    type: messageType,
    content: answer.choices[0].message.content,
    user: userId,
  });

  await MessageLog.create({
    user: userId,
    receivedMessage: createdUserMessage._id,
    outcomeMessage: createdAiMessage._id,
    logs: {
      openai: answer,
    },
  });

  res.success({
    status: 201,
    message: createdAiMessage,
    totalPromptUsage,
  });
};

exports.index = async (req, res, next) => {
  const userId = String(req.user._id);

  const allMessages = await Message.find({ user: userId });

  res.success({
    messages: allMessages,
  });
};
