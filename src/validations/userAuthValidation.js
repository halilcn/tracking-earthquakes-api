const Joi = require("joi");

const authSchema = Joi.object({
  credential: Joi.string().required(),
});

module.exports = authSchema;
