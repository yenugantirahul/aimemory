import { llmService } from "../llm/llm.service.js";
import { memoryController } from "../memory/memory.controller.js";
export const chatService = {
  async getResponse(prompt: string) {
    return await llmService.getAiResponse(prompt);
  },
  remember() {
    return memoryController.remember()
  },
  retrieve() {
    return memoryController.retrieve()
  }
  
};
