const express = require("express");
const {
  createMessage,
  getMessageToGroup,
  generateSummary,
} = require("../controllers/messageController");
const { protect } = require("../middlerware/AuthMiddlerware");
const router = express.Router();

router.post("/", createMessage);
router.get("/:groupMessage", getMessageToGroup);
// router.post("/test/:name/:amount/:walletAddress",generateSummary)
module.exports = router;
