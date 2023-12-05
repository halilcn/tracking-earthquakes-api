const Joi = require("joi");

const aiEarthquakeMessageSchema = Joi.object({
  userMessageId: Joi.string().required(),
  earthquakes: Joi.string().required(),
});

module.exports = aiEarthquakeMessageSchema;
