import { logger, task } from "@trigger.dev/sdk";
import { UUID } from "node:crypto";
import { memoryService } from "../modules/memory/memory.service.js";
import { db } from "../database/db.js";
import { message } from "../database/schema.js";
import { createId } from "@paralleldrive/cuid2";
export const helloWorldTask = task({
  id: "hello-world",

  run: async (payload: { userId: UUID; prompt: string }) => {
    logger.log("Hello", payload);

    await memoryService.rememberMemories(payload.userId, payload.prompt);
  },
});

export const dbInsertPrompt = task({
  id: "Db insert",

  run: async (payload: { userId: UUID; prompt: string }) => {
    logger.log("Hello", payload);
    await db.insert(message).values({
      id: createId(),
      userId: payload.userId,
      role: "user",
      content: payload.prompt,
    });
  },
});
export const dbInsertResponse = task({
  id: "Db insert response",

  run: async (payload: { userId: UUID; response: string }) => {
    logger.log("Hello", payload);
    await db.insert(message).values({
      id: createId(),
      userId: payload.userId,
      role: "assistant",
      content: payload.response,
    });
  },
});
