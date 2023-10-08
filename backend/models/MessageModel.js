import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contentSend: {
    type: String,
    required: true,
  },
  contentRep: {
    type: String,
    default: "",
  },
  contentRepNew:{
    type: String,
    default: "",
  },
  isUser: {
    type: Boolean,
    default: true,
    // required: true,
  },
  groupMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default  Message;
