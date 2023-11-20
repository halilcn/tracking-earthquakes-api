const mongoose = require("mongoose");
const { DEFAULT_MESSAGE_LIMITS } = require("../constants");

const MessageLimit = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    generalMessageLimit: {
      type: Number,
      required: true,
      default: DEFAULT_MESSAGE_LIMITS.general,
    },
    earthquakeMessageLimit: {
      type: Number,
      required: true,
      default: DEFAULT_MESSAGE_LIMITS.earthquake,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MessageLimit", MessageLimit);
