// qdrant.client.ts

import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  host: "localhost",
  port: 6333,
});

export const qdrantService = {
  async upsertMemory(embedding: number[], payload: Record<string, any>) {
    return client.upsert("memories", {
      wait: true,
      points: [
        {
          id: crypto.randomUUID(),
          vector: embedding,
          payload,
        },
      ],
    });
  },
  async searchMemory(embedding: number[], limit = 5) {
    return client.search("memories", {
      vector: embedding,
      limit,
    });
  },
};
