const Joi = require("joi");
const { MESSAGE_TYPES } = require("../constants");

const messageSchema = Joi.object({
  content: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(MESSAGE_TYPES))
    .required(),
});

module.exports = messageSchema;
