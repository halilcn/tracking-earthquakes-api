const Joi = require("joi");

const aiEarthquakeMessageSchema = Joi.object({
  userMessageId: Joi.string().required(),
  earthquakes: Joi.array()
    .items(
      Joi.object().keys({
        coordinates: Joi.array().required(),
        date: Joi.string().required(),
        mag: Joi.string().required(),
        location: Joi.string().required(),
      })
    )
    .required(),
});

module.exports = aiEarthquakeMessageSchema;
