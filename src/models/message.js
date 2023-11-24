const mongoose = require("mongoose");
const { MESSAGE_OWNERS, MESSAGE_TYPES } = require("../constants");

const Message = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    owner: {
      type: String,
      enum: Object.values(MESSAGE_OWNERS),
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(MESSAGE_TYPES),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", Message);
