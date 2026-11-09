import { UUID } from "node:crypto";
import { z } from "zod";

// better-auth ids aren't real UUIDs, but the services are typed with UUID.
export const userIdSchema = z
  .string()
  .min(1)
  .transform((id) => id as UUID);

export const entitySchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
});

export const relationshipSchema = z.object({
  relation: z.string().min(1),
  entity: z.string().min(1),
  entityType: z.string().min(1),
});

// Shape we ask Gemini to return when extracting a knowledge graph.
export const graphSchema = z.object({
  entities: z.array(entitySchema).default([]),
  relationships: z.array(relationshipSchema).default([]),
});

// Payload stored alongside each vector in the Qdrant "memories" collection.
export const memoryPayloadSchema = z.object({
  userId: z.string(),
  prompt: z.string(),
});

export type Entity = z.infer<typeof entitySchema>;
export type Relationship = z.infer<typeof relationshipSchema>;
export type Graph = z.infer<typeof graphSchema>;
export type MemoryPayload = z.infer<typeof memoryPayloadSchema>;
