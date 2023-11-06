const express = require("express");
const userController = require("../../../controllers/userController");
const validator = require("../../../validator");
const userAuthValidation = require("../../../validations/userAuthValidation");

const router = express.Router();

router.post("/auth", validator(userAuthValidation), userController.auth);

module.exports = router;
