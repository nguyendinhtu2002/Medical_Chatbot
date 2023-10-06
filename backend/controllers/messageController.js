const modelMessage = require("../models/MessageModel");
const Joi = require("joi");
const randomstring = require("randomstring");
const User = require("../models/UsersModel");

const createMessage = async (req, res, next) => {
  const schema = Joi.object({
    contentSend: Joi.string().required().messages({
      "any.required": "Content is required",
    }),
    contentRep: Joi.string().required().messages({
      "any.required": "Content is required",
    }),
    sender: Joi.string().required().messages({
      "any.required": "Sender is required",
    }),
    groupMessage: Joi.string().required().messages({
      "any.required": "Group Message is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { sender, content, groupMessage } = req.body;
    const senderExits = await User.findOne({ _id: sender });
    if (!senderExits) {
      return res.status(400).json({ message: "Sender not found" });
    }
    const messages = await modelMessage.create(req.body);

    if (messages) {
      return res.status(201).json({
        status: "success",
        message: "Messages created successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
const getMessageToGroup = async (req, res, next) => {
  try {
    const { groupMessage } = req.params;
    if (!groupMessage) {
      return res.json(500).json({
        error: true,
        message: "Group Message not found",
      });
    } else {
      const messages = await modelMessage.find({ groupMessage });
      return res.status(200).json({ messages });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createMessage,
  getMessageToGroup,
};
