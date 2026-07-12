import express from "express"
import { authMiddleware } from "../../middleware/authorize.js"
import { chatController } from "./chat.controller.js";

const router = express.Router();
router.use(authMiddleware)
router.post("/", chatController.chat)


export default router
