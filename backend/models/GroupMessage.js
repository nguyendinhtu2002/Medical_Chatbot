const mongoose = require('mongoose');

const groupMessageSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    nameGroup:{
        type:String,
        require:true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });
  
  const GroupMessage = mongoose.model('GroupMessage', groupMessageSchema);
  
  module.exports = GroupMessage;
  