const express = require("express");
const errorCatcher = require("../../errorCatcher");
const messageController = require("../../controllers/messageController");
const validator = require("../../validator");
const messageValidation = require("../../validations/messageValidation.js");

const router = express.Router();

router.post(
  "/",
  validator(messageValidation),
  errorCatcher(messageController.store)
);

router.get("/", errorCatcher(messageController.index));

module.exports = router;
