import express from "express";
import {createGroup, getGroupByUser} from'../controllers/groupController.js';

const router = express.Router();

router.post("/", createGroup);
router.get("/:id", getGroupByUser);

export default router;
