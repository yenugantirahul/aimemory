import express from "express"
import { authMiddleware } from "../../middleware/authorize.js"
import { validate } from "../../middleware/validate.js";
import { chatController } from "./chat.controller.js";
import { chatBodySchema, messagesQuerySchema } from "./chat.schema.js";

const router = express.Router();
router.use(authMiddleware)
router.post("/", validate({ body: chatBodySchema }), chatController.chat)
router.post("/stream", validate({ body: chatBodySchema }), chatController.chatStream)

router.get("/", validate({ query: messagesQuerySchema }), chatController.getAllMessages)
export default router
