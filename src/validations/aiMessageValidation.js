const Joi = require("joi");

const aiMessageSchema = Joi.object({
  content: Joi.string().required(),
});

module.exports = aiMessageSchema;
