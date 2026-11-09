import { UUID } from "node:crypto";
import { createId } from "@paralleldrive/cuid2";
import { llmService } from "../llm/llm.service.js";
import { memoryService } from "../memory/memory.service.js";
import { db } from "../../database/db.js";
import { message } from "../../database/schema.js";
import { and, desc, eq, sql } from "drizzle-orm";
import { memoryPayloadSchema } from "../../schemas/memory.schema.js";

import { helloWorldTask } from "../../trigger/example.js";

export interface ChatTurn {
  userId: UUID;
  prompt: string;
  response: string;
  promptAt: Date;
  respondedAt: Date;
}

export const chatService = {
  // Retrieves relevant memories and builds the prompt sent to the LLM.
  async buildPrompt(userId: UUID, prompt: string) {
    const stored = await memoryService.retrieveMemories(userId, prompt);

    const memories = stored.qdrantMemories;
    const relations = stored.relations;

    // Format semantic memories, skipping points whose payload doesn't match what we store.
    const memoryText = memories
      .flatMap((memory) => {
        const payload = memoryPayloadSchema.safeParse(memory.payload);
        return payload.success ? [`- ${payload.data.prompt}`] : [];
      })
      .join("\n");

    // Format graph relationships
    const relationText = relations
      .map((relation) => `- User ${relation.relation} ${relation.entity}`)
      .join("\n");

    return `
You are a helpful AI assistant.

Relevant Memories:
${memoryText || "None"}

Known Facts:
${relationText || "None"}

Current User Message:
${prompt}

Answer naturally using the memories and known facts only if they are relevant.
`;
  },

  async getResponse(userId: UUID, prompt: string) {
    const finalPrompt = await this.buildPrompt(userId, prompt);
    return await llmService.getAiResponse(finalPrompt);
  },

  async *streamResponse(userId: UUID, prompt: string, signal?: AbortSignal) {
    const finalPrompt = await this.buildPrompt(userId, prompt);
    yield* llmService.streamAiResponse(finalPrompt, signal);
  },

  // Persists both messages and queues memory extraction. Callers run this
  // after the response has been sent, so it never adds latency.
  async saveTurn({ userId, prompt, response, promptAt, respondedAt }: ChatTurn) {
    await db.insert(message).values([
      { id: createId(), userId, role: "user", content: prompt, createdAt: promptAt },
      {
        id: createId(),
        userId,
        role: "assistant",
        content: response,
        createdAt: respondedAt,
      },
    ]);

    await helloWorldTask.trigger({ userId, prompt });
  },

  // Newest `limit` messages (optionally older than the `before` message id),
  // returned oldest-first for display.
  async getMessages(uId: UUID, limit: number, before?: string) {
    const rows = await db
      .select()
      .from(message)
      .where(
        and(
          eq(message.userId, uId),
          before
            ? sql`(${message.createdAt}, ${message.id}) < (
                select created_at, id from message
                where id = ${before} and user_id = ${uId}
              )`
            : undefined,
        ),
      )
      .orderBy(desc(message.createdAt), desc(message.id))
      .limit(limit + 1);

    const hasMore = rows.length > limit;
    const page = rows.slice(0, limit).reverse();

    return {
      messages: page,
      nextCursor: hasMore ? page[0].id : null,
    };
  },
};
