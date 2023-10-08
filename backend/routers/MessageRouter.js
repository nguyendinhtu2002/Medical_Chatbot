import express from "express";
import { createMessage, getMessageToGroup } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/:groupMessage", getMessageToGroup);
// router.post("/test/:name/:amount/:walletAddress",generateSummary)
export default  router;
