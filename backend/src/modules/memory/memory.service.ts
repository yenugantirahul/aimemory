import { qdrantService } from "../../clients/qdrant.client.js";
import { llmService } from "../llm/llm.service.js";

export const memoryService = {
  async rememberMemories(prompt: string) {
    const embedding = await this.generateEmbedding(prompt);

    await qdrantService.upsertMemory(embedding, {
      userId: "123",
      prompt,
    });
  },

  retrieveMemories() {
    return "Hello AI memory i retrieve everything";
  },

  async generateEmbedding(text: string) {
    return (await llmService.generateEmbedding(text));
  },
};