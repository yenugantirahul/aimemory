import { chatService } from "./chat.service.js";
import { Request, Response } from "express";

export const chatController = {
  async chat(req: Request, res: Response) {
    const response = await chatService.getResponse(req.body.prompt);
    const memory1 = chatService.remember()
    const memory2 = chatService.retrieve()
    return res.json({
      message: [response, memory1, memory2],

    });
  },
};
