const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use("/users", require("./users"));
router.use("/messages", authMiddleware, require("./messages"));
router.use("/message-limits", authMiddleware, require("./messageLimits"));

module.exports = router;
