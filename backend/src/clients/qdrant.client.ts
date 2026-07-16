import { QdrantClient } from "@qdrant/js-client-rest";
import { randomUUID, UUID } from "node:crypto";

export const client = new QdrantClient({
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY!,
});

export const qdrantService = {
  async createCollection() {
    await client.deleteCollection("memories");

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
    payload: Record<string, any>,
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
          },
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
