const Joi = require("joi");
const { MESSAGE_OWNERS } = require("../constants");

const messageSchema = Joi.object({
  owner: Joi.string().valid(...MESSAGE_OWNERS).required(),
  content: Joi.string().required(),
});

module.exports = messageSchema;
