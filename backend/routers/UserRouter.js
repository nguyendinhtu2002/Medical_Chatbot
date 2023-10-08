import express from "express";
import { RefreshTokenController, login, register } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh_token", RefreshTokenController);
router.post("/updateProfile/:id", protect, updateAccount);
router.get("/:_id", protect, getUserById);
router.post("/login/admin", loginAdmin);
router.get("/", protect, admin, getAll);
router.put("/updateAdmin/:id",protect,admin,updateAdmin)
router.delete("/:id",protect,admin,deleteUser)
router.post("/updatePassword",forgotPassword)

export default router;
