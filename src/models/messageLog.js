const mongoose = require("mongoose");

const MessageLog = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    outcomeMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
      required: false,
    },
    receivedMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
      required: false,
    },
    logs: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MessageLog", MessageLog);
