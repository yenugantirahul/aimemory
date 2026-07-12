import { llmService } from "../llm/llm.service.js";
export const chatService = {
   getResponse(prompt: string) {
    return llmService.getAiResponse(prompt);
  },
};
