const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    name: String,
    photo: String,
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
