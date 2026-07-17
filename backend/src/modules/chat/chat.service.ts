import { UUID } from "node:crypto";
import { llmService } from "../llm/llm.service.js";
import { memoryService } from "../memory/memory.service.js";
import { db } from "../../database/db.js";
import { message } from "../../database/schema.js";
import { eq, asc } from "drizzle-orm";

import {
  dbInsertPrompt,
  dbInsertResponse,
  helloWorldTask,
} from "../../trigger/example.js";
export const chatService = {
  async getResponse(userId: UUID, prompt: string) {
    // Retrieve memories
    const stored = await memoryService.retrieveMemories(userId, prompt);

    const memories = stored.qdrantMemories;
    const relations = stored.relations;

    // Format semantic memories
    const memoryText = memories
      .map((memory) => `- ${memory.payload?.prompt}`)
      .join("\n");

    // Format graph relationships
    const relationText = relations
      .map((relation) => `- User ${relation.relation} ${relation.entity}`)
      .join("\n");

    // Build prompt
    const finalPrompt = `
You are a helpful AI assistant.

Relevant Memories:
${memoryText || "None"}

Known Facts:
${relationText || "None"}

Current User Message:
${prompt}

Answer naturally using the memories and known facts only if they are relevant.
`;

    // Generate AI response
    const response = await llmService.getAiResponse(finalPrompt);

    // Queue memory processing in the background
    if (response) {
      await helloWorldTask.trigger({ userId, prompt });
      await dbInsertPrompt.trigger({ userId, prompt });
      await dbInsertResponse.trigger({ userId, response });
    }

    return response;
  },

  async getMessages(uId: UUID) {
    const messages = await db
      .select()
      .from(message)
      .where(eq(message.userId, uId))
      .orderBy(asc(message.createdAt));

    return messages;
  },
};
