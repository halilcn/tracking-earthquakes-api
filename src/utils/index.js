const { CustomError } = require("../errors");

exports.isCustomError = (errorClass) => errorClass instanceof CustomError;
