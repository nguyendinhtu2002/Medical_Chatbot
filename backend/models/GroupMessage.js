import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nameGroup: {
    type: String,
    require: true,
  },
  countMessage: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);

export default GroupMessage;
