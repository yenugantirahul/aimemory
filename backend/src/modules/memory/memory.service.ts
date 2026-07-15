import { UUID } from "node:crypto";
import { qdrantService } from "../../clients/qdrant.client.js";
import { llmService } from "../llm/llm.service.js";
import { neo4jService } from "../../clients/neo4j.client.js";

export const memoryService = {
  // Remember the information
  async rememberMemories(userId: UUID, prompt: string) {
    const embedding = await this.generateEmbedding(prompt);

    await qdrantService.upsertMemory(userId, embedding, {
      userId: "123",
      prompt,
    });
    await neo4jService.search(prompt);
  },

  // Retrieve memories from Qdrant
  async retrieveMemories(userId: UUID, prompt: string) {
    const embedding = await this.generateEmbedding(prompt);

    const qdrantMemories = await qdrantService.searchMemory(
      userId,
      embedding,
      5,
    );
    const relations = await neo4jService.search(userId);

    return {
      qdrantMemories,
      relations,
    };
  },

  // Insert relationships into neo4j
  async insertRelationships(userId: UUID, prompt: string) {
    const relations = await llmService.generateRelationships(prompt);
    await neo4jService.insert(userId, relations.relationships);
  },

  // Extract relationships from neo4j
  async extractRelationships(userId: UUID) {
    return await neo4jService.search(userId);
  },

  // Get the embeddings
  async generateEmbedding(text: string) {
    return await llmService.generateEmbedding(text);
  },
};
