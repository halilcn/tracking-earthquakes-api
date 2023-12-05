const express = require("express");
const errorCatcher = require("../../errorCatcher");
const messageController = require("../../controllers/messageController");
const validator = require("../../validator");
const aiMessageValidation = require("../../validations/aiMessageValidation.js");
const aiEarthquakeMessageSchema = require("../../validations/aiEarthquakeMessageValidation.js");

const router = express.Router();

router.post(
  "/ai",
  validator(aiMessageValidation),
  errorCatcher(messageController.storeAiMessage)
);

router.post(
  "/ai-earthquake",
  validator(aiEarthquakeMessageSchema),
  errorCatcher(messageController.storeAiEarthquake)
);

router.get("/", errorCatcher(messageController.index));

module.exports = router;
