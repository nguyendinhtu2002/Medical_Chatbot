import modelGroupMessage from "../models/GroupMessage.js";
import Joi from "joi";
import randomstring from "randomstring";
import User from "../models/UsersModel.js";

const createGroup = async (req, res, next) => {
  const schema = Joi.object({
    nameGroup: Joi.string().required().messages({
      "any.required": "Name Group is required",
    }),
    user: Joi.string().required().messages({
      "any.required": "User is required",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const { user, nameGroup } = req.body;
    const userCheck = await User.findOne({ _id: user });
    if (!userCheck) {
      return res.status(500).json({
        error: true,
        message: "User not found",
      });
    }

    const group = await modelGroupMessage.create({
      user,
      nameGroup,
    });

    if (group) {
      return res.status(201).json({
        error: false,
        message: "Group registered successfully",
        data: group,
      });
    } else {
      return res.error(400).json({
        error: true,
        message: "Invalid Group Data",
      });
    }
  } catch (error) {
    next(error);
  }
};
const getGroupByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userCheck = await User.findOne({ _id: id });
    const arr = [];
    if (!userCheck) {
      return res.status(500).json({
        error: true,
        message: "User not found",
      });
    }

    const groups = await modelGroupMessage.find({ user: id });
    if (groups) {
      return res.json({ groups });
    }
    return res.json(arr);
  } catch (error) {
    next(error);
  }
};
export { createGroup, getGroupByUser };
