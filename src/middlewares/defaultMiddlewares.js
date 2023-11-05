const cors = require("cors");
const bodyParser = require("body-parser");
const responseHandler = require("../responseHandler");

module.exports = (app) => {
  app.use(
    cors({
      origin: [
        "https://tracking-earthquakes.vercel.app",
        "http://localhost:5173/",
      ],
      methods: "GET,POST,PUT,DELETE,OPTIONS",
    })
  );
  app.use(bodyParser.json());
  app.use(responseHandler);
};
