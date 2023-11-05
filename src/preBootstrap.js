require("dotenv").config();

require("mongoose")
  .connect(process.env.MONGOOSE_URI)
  .catch((err) =>
    console.log(`An error occurred while connecting to MongoDB: ${err}`)
  )
  .then(() => console.log("MongoDB is connected!"));
