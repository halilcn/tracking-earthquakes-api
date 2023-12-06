const Joi = require("joi");

const aiEarthquakeMessageSchema = Joi.object({
  userMessageId: Joi.string().required(),
  earthquakes: Joi.array().required(),
});

module.exports = aiEarthquakeMessageSchema;
