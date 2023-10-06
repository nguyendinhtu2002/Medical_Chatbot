const express = require("express");
const {
  createMessage,
  getMessageToGroup,
} = require("../controllers/messageController");
const { protect } = require("../middlerware/AuthMiddlerware");
const router = express.Router();

router.post("/", createMessage);
router.get("/:groupMessage", getMessageToGroup);
module.exports = router;
