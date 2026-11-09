import { chatService, ChatTurn } from "./chat.service.js";
import { Request, Response } from "express";
import { UUID } from "node:crypto";
import { ChatBody, MessagesQuery } from "./chat.schema.js";

// Runs after the response is sent, so failures are logged rather than returned.
async function saveInBackground(turn: ChatTurn) {
  if (!turn.response) return;

  try {
    await chatService.saveTurn(turn);
  } catch (err) {
    console.error("Failed to save chat turn:", err);
  }
}

function sendEvent(res: Response, data: Record<string, unknown>) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

export const chatController = {
  // req.body has already been parsed by validate({ body: chatBodySchema }).
  async chat(req: Request<{}, unknown, ChatBody>, res: Response) {
    const { prompt } = req.body;
    const userId = req.user.id as UUID;
    const promptAt = new Date();

    const response = await chatService.getResponse(userId, prompt);

    res.json({
      response,
    });

    await saveInBackground({
      userId,
      prompt,
      response,
      promptAt,
      respondedAt: new Date(),
    });
  },

  // Server-sent events: {type:"delta",text} per chunk, then {type:"done"}
  // or {type:"error",message}.
  async chatStream(req: Request<{}, unknown, ChatBody>, res: Response) {
    const { prompt } = req.body;
    const userId = req.user.id as UUID;
    const promptAt = new Date();
    const startedAt = performance.now();

    // Stop generating if the client goes away mid-stream.
    const controller = new AbortController();
    res.on("close", () => {
      if (!res.writableEnded) controller.abort();
    });

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      // Disable proxy buffering so chunks reach the browser immediately.
      "X-Accel-Buffering": "no",
    });
    res.flushHeaders();

    let response = "";
    let firstTokenMs: number | undefined;

    try {
      for await (const text of chatService.streamResponse(
        userId,
        prompt,
        controller.signal,
      )) {
        firstTokenMs ??= Math.round(performance.now() - startedAt);
        response += text;
        sendEvent(res, { type: "delta", text });
      }

      sendEvent(res, { type: "done" });
    } catch (err) {
      if (controller.signal.aborted) return;
      console.error("Chat stream failed:", err);
      sendEvent(res, { type: "error", message: "Failed to generate a response" });
      response = "";
    } finally {
      res.end();
    }

    console.log("chat stream timing", {
      firstTokenMs,
      totalMs: Math.round(performance.now() - startedAt),
    });

    await saveInBackground({
      userId,
      prompt,
      response,
      promptAt,
      respondedAt: new Date(),
    });
  },

  async getAllMessages(req: Request, res: Response) {
    const userId = req.user.id as UUID;
    // req.query has already been parsed by validate({ query: messagesQuerySchema }).
    const { limit, before } = req.query as unknown as MessagesQuery;
    const page = await chatService.getMessages(userId, limit, before);
    return res.json(page);
  },
};
