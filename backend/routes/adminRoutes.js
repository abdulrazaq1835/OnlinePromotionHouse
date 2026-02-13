import express from "express";
import {
  addAdminReply,
  getAdminReply,
} from "../controllers/adminReplyControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router()

router.post(
  "/reply/:postId",
  authMiddleware,
  adminMiddleware,
  addAdminReply
);

router.get("/reply/:postId", getAdminReply);

export default router
