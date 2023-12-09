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
  getEarthquakeMessagePrompt,
} = require("../utils/prompts");
const dayjs = require("dayjs");

const normalizationEarthquakes = (earthquakes) =>
  earthquakes
    .map((earthquake) => {
      const { mag, coordinates, date: _date, location: _location } = earthquake;

      const [long, lat] = coordinates.map((coordinate) =>
        coordinate.toFixed(2)
      );
      const date = dayjs(_date).locale("en").format("DD MMMM YYYY HH:mm");
      const location = _location.toLocaleLowerCase("en-US");

      return `long:${long},lat:${lat},date:${date},mag:${mag},location:${location}//`;
    })
    .join("");

// TODO: need transaction
exports.storeAiMessage = async (req, res, next) => {
  const userId = String(req.user._id);
  const messageType = MESSAGE_TYPES.general;
  const { content } = req.body;

  const hasMessageLimit = await messageLimitService.checkHasMessageLimit({
    user: userId,
  });
  if (!hasMessageLimit) throw new BadRequestError("Not enough message limit");

  let createdUserMessage;
  try {
    createdUserMessage = await messageService.createUserMessage({
      content,
      type: messageType,
      user: userId,
    });
  } catch (err) {
    throw new BadRequestError("An error occurred while creating user message");
  }

  const answer = await aiService.askQuestion({
    prompt: getGeneralMessagePrompt(),
    question: content,
    functions: getGeneralMessagePromptFunctions(),
  });

  const totalPromptUsage = answer.usage.total_tokens;
  await messageLimitService.reduceMessageLimit({
    user: userId,
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
      createdUserMessage,
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
    createdUserMessage,
    totalPromptUsage,
  });
};

exports.storeAiEarthquake = async (req, res, next) => {
  const userId = String(req.user._id);
  const { userMessageId, earthquakes } = req.body;
  const normalizedEarthquakes = normalizationEarthquakes(earthquakes);

  const hasMessageLimit = await messageLimitService.checkHasMessageLimit({
    user: userId,
  });
  if (!hasMessageLimit) throw new BadRequestError("Not enough message limit");

  const userMessage = await Message.findById(userMessageId);
  if (String(userMessage?.user) !== String(userId))
    throw new BadRequestError("The owner of the message is different");

  const answer = await aiService.askQuestion({
    prompt: getEarthquakeMessagePrompt(normalizedEarthquakes),
    question: userMessage.content,
    model: "gpt-3.5-turbo-1106",
  });

  const totalPromptUsage = answer.usage.total_tokens;
  await messageLimitService.reduceMessageLimit({
    user: userId,
    totalPromptUsage,
  });

  const createdAiMessage = await messageService.createAiMessage({
    type: MESSAGE_TYPES.earthquake,
    content: answer.choices[0].message.content,
    user: userId,
  });

  await MessageLog.create({
    user: userId,
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
