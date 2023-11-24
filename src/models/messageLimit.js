const mongoose = require("mongoose");
const { DEFAULT_MESSAGE_LIMITS, MESSAGE_TYPES } = require("../constants");

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
      default: DEFAULT_MESSAGE_LIMITS[MESSAGE_TYPES.general],
    },
    earthquakeMessageLimit: {
      type: Number,
      required: true,
      default: DEFAULT_MESSAGE_LIMITS[MESSAGE_TYPES.earthquake],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MessageLimit", MessageLimit);
