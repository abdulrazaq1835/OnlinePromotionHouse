import express from "express";
import {
  createPost,
  getAllPosts,
  getSinglePost,
} from "../controllers/postConttrollers.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost)
router.get("/", getAllPosts)
router.get("/:id", getSinglePost)

export default router
