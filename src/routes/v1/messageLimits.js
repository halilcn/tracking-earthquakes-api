const express = require("express");
const errorCatcher = require("../../errorCatcher");
const messageLimitController = require("../../controllers/messageLimitController");

const router = express.Router();

router.get("/", errorCatcher(messageLimitController.index));

module.exports = router;
