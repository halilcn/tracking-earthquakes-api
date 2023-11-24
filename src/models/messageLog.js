const mongoose = require("mongoose");

const MessageLog = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    message: { type: mongoose.Types.ObjectId, ref: "Message", required: true },
    logs: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MessageLog", MessageLog);
