const cors = require("cors");
const bodyParser = require("body-parser");
const responseHandler = require("../responseHandler");

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(responseHandler);
};
