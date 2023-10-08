import express from "express";
import {createGroup, getGroupByUser} from'../controllers/groupController.js';

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroupByUser);

export default router;
