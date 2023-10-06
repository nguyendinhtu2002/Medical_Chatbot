const express = require("express");
const { createGroup, getGroupByUser } = require("../controllers/groupController");
const { protect } = require("../middlerware/AuthMiddlerware");

const router = express.Router();

router.post("/", createGroup);
router.get("/", protect, getGroupByUser);
module.exports = router;
