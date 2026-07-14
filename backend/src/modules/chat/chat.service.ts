import { randomUUID, UUID } from "node:crypto";
import { llmService } from "../llm/llm.service.js";
import { memoryController } from "../memory/memory.controller.js";

export const chatService = {
  async getResponse(userId: UUID, prompt: string) {
    const stored = await memoryController.retrieve(userId, prompt);
    const memoryText = stored
      .map((memory) => `- ${memory.payload?.prompt}`)
      .join("\n");

    const finalPrompt = `
You are a helpful AI assistant.

Relevant memories:
${memoryText}

Current user message:
${prompt}

Answer naturally using the memories only if they are relevant.
`;
    const res = await llmService.getAiResponse(finalPrompt);
    if (res != undefined) {
      await memoryController.remember(userId, res);
    }
    return res;
  },
};
