import { chatService } from "./chat.service.js";
import { Request, Response } from "express";
import { UUID } from "node:crypto";

export const chatController = {
  async chat(req: Request, res: Response) {
    const prompt = req.body.prompt;
    const userId = req.user.id as UUID;

    const response = await chatService.getResponse(userId, prompt);

    return res.json({
      response,
    });
  },

  async getAllMessages(req: Request, res: Response) {
    const userId = req.user.id as UUID;
    const messages = await chatService.getMessages(userId);
    return res.json(messages);
  },
};
