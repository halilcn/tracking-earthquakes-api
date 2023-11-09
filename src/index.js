const express = require("express");
const errorHandler = require("./errorHandler");
const notFoundErrorHandler = require("./notFoundErrorHandler.js");

const app = express();

require("./preBootstrap");
require("./middlewares/defaultMiddlewares.js")(app);

app.use("/", require("./routes"));

app.use(notFoundErrorHandler);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
