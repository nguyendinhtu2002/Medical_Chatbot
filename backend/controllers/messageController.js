const modelMessage = require("../models/MessageModel");
const Joi = require("joi");
const randomstring = require("randomstring");
const User = require("../models/UsersModel");
const OpenAI = require('openai');
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

async function message(messages) {

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ "role": "user", "content": messages }],
  });
  if (chatCompletion) {
    return chatCompletion.choices[0].message

  }
}
const createMessage = async (req, res, next) => {
  const schema = Joi.object({
    contentSend: Joi.string().required().messages({
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
    const { sender, contentSend, groupMessage } = req.body;
    // const senderExits = await User.findOne({ _id: sender });
    // if (!senderExits) {
    //   return res.status(400).json({ message: "Sender not found" });
    // }

    const data = await message(contentSend);

    if (data) {
      const { role, content } = data;

      const messages = await modelMessage.create({
        ...req.body,
        contentRep: content
      });

      return res.status(201).json({
        status: "success",
        message: messages,
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
