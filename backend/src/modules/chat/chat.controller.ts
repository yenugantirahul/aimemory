import { memoryService } from "../memory/memory.service.js";
import { chatService } from "./chat.service.js";
import { Request, Response } from "express";

export const chatController = {
  async chat(req: Request, res: Response) {
    const prompt = req.body.prompt;
    const userId = req.body.userId;
    const response = await chatService.getResponse(userId, prompt);
   
    return res.json({
      message: [response],

    });
  },
};
