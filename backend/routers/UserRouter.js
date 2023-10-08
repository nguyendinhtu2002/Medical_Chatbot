import express from "express";
import { RefreshTokenController, login, register } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh_token", RefreshTokenController);

export default router;