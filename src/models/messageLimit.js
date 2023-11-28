const mongoose = require("mongoose");
const { DEFAULT_MESSAGE_TOKEN_LIMIT } = require("../constants");

const MessageLimit = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    token: {
      type: Number,
      required: true,
      default: DEFAULT_MESSAGE_TOKEN_LIMIT,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MessageLimit", MessageLimit);
