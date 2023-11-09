const express = require("express");
const userController = require("../../../controllers/userController");
const validator = require("../../../validator");
const userAuthValidation = require("../../../validations/userAuthValidation");
const errorCatcher = require("../../../errorCatcher");

const router = express.Router();

router.post(
  "/auth",
  validator(userAuthValidation),
  errorCatcher(userController.auth)
);

module.exports = router;
