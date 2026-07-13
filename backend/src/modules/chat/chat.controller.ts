import { chatService } from "./chat.service.js";
import { Request, Response } from "express";

export const chatController = {
  async chat(req: Request, res: Response) {
    const response = await chatService.getResponse(req.body.prompt);
    return res.json({
      message: response,
    });
  },
};
