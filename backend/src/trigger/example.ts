import { logger, task } from "@trigger.dev/sdk";
import { UUID } from "node:crypto";
import { memoryService } from "../modules/memory/memory.service.js";

export const helloWorldTask = task({
  id: "hello-world",

  run: async (payload: { userId: UUID, prompt: string }) => {
    logger.log("Hello", payload);
    
      await memoryService.rememberMemories(payload.userId, payload.prompt);
    
  },
});