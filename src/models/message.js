const mongoose = require("mongoose");
const { MESSAGE_OWNERS } = require("../constants");

const Message = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    owner: {
      type: String,
      enum: MESSAGE_OWNERS,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", Message);
