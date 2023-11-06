const { UnprocessableEntity } = require("./errors");

module.exports = (validationFunc) => async (req, res, next) => {
  try {
    const validated = await validationFunc.validateAsync(req.body, {
      abortEarly: false,
    });
    req.body = validated;
    next();
  } catch (err) {
    if (err.isJoi) {
      next(new UnprocessableEntity({ data: err.details }));
    }
  }
};
