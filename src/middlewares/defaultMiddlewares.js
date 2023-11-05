const cors = require("cors");
const bodyParser = require("body-parser");

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
};
