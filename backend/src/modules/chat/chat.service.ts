import { llmService } from "../llm/llm.service.js";
export const chatService = {
  async getResponse(prompt: string) {
    return await llmService.getAiResponse(prompt);
  },
};
