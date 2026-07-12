import { chatService } from "./chat.service.js";
import { Request, Response } from "express";

export const chatController = {
   chat(req: Request, res: Response) {
    const response = chatService.getResponse(req.body.prompt);
    return res.json({
      message: response,
    });
  },
};
