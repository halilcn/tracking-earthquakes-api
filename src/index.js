const express = require("express");
const app = express();

require("./preBootstrap");
require("./middlewares/defaultMiddlewares.js")(app);

app.use("/", require("./routes"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
