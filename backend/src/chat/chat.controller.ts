import { getResponse } from "./chat.service.js";
import { Request, Response } from "express";

export const chatController = (req: Request, res: Response) => {
    const response = getResponse(req.body.prompt)
  return res.json({
    message: response
  })
};
