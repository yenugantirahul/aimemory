import { UUID } from "node:crypto";
import { qdrantService } from "../../clients/qdrant.client.js";
import { llmService } from "../llm/llm.service.js";

export const memoryService = {
  async rememberMemories(userId: UUID, prompt: string) {
    const embedding = await this.generateEmbedding(prompt);

   return await qdrantService.upsertMemory(userId, embedding, {
      userId: "123",
      prompt,
    });
  },
  async retrieveMemories(userId: UUID, prompt: string) {
    const embedding = await this.generateEmbedding(prompt);

    return await qdrantService.searchMemory(userId, embedding, 5);
  },

  async generateEmbedding(text: string) {
    return await llmService.generateEmbedding(text);
  },
};
