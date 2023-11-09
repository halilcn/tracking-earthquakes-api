const express = require("express");
const userController = require("../../../controllers/userController");
const validator = require("../../../validator");
const userAuthValidation = require("../../../validations/userAuthValidation");
const errorCatcher = require("../../../errorCatcher");
const authMiddleware = require("../../../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/auth",
  validator(userAuthValidation),
  errorCatcher(userController.auth)
);

router.post("/logout", authMiddleware, errorCatcher(userController.logout));

module.exports = router;
