import { QdrantClient } from "@qdrant/js-client-rest";
import { randomUUID, UUID } from "node:crypto";
import { env } from "../config/env.js";
import { MemoryPayload } from "../schemas/memory.schema.js";

export const client = new QdrantClient({
  url: env.QDRANT_URL,
  apiKey: env.QDRANT_API_KEY,
});

export const qdrantService = {
  async createCollection() {
    const collections = await client.getCollections();

    const exists = collections.collections.some(
      (collection) => collection.name === "memories",
    );

    if (!exists) {
      await client.createCollection("memories", {
        vectors: {
          size: 3072,
          distance: "Cosine",
        },
      });

      // Create payload index for userId
      await client.createPayloadIndex("memories", {
        field_name: "userId",
        field_schema: "keyword",
      });

      console.log("Created 'memories' collection");
    }
  },

  async upsertMemory(
    userId: string,
    embedding: number[],
    payload: Omit<MemoryPayload, "userId">,
  ) {
    const memoryId = randomUUID();

    await client.upsert("memories", {
      wait: true,
      points: [
        {
          id: memoryId,
          vector: embedding,
          payload: {
            ...payload,
            userId,
          } satisfies MemoryPayload,
        },
      ],
    });

    return memoryId;
  },

  async searchMemory(userId: UUID, embedding: number[], limit: number) {
    try {
      return await client.search("memories", {
        vector: embedding,
        limit,
        filter: {
          must: [
            {
              key: "userId",
              match: {
                value: userId,
              },
            },
          ],
        },
      });
    } catch (e: any) {
      console.error("Qdrant error:", e);
      console.error("Response:", e.response);
      console.error("Body:", e.body);
      throw e;
    }
  },
};
