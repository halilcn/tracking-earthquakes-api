const express = require("express");
const currentStatusController = require("../controllers/currentStatusController");
const errorCatcher = require("../errorCatcher");

const router = express.Router();

router.use("/api/v1", require("./v1"));
router.get("/api/current-status", errorCatcher(currentStatusController.status));

module.exports = router;
