import { logger, schemaTask } from "@trigger.dev/sdk";
import { z } from "zod";
import { memoryService } from "../modules/memory/memory.service.js";
import { userIdSchema } from "../schemas/memory.schema.js";

const promptPayloadSchema = z.object({
  userId: userIdSchema,
  prompt: z.string().min(1),
});

// Messages are saved by the API directly; only memory extraction runs here.
export const helloWorldTask = schemaTask({
  id: "hello-world",
  schema: promptPayloadSchema,

  run: async (payload) => {
    logger.log("Hello", payload);

    await memoryService.rememberMemories(payload.userId, payload.prompt);
  },
});
