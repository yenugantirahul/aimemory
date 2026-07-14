import { UUID } from "node:crypto"
import { memoryService } from "./memory.service.js"

export const memoryController = {
   async remember(userId: UUID, prompt: string) {
        return memoryService.rememberMemories(userId, prompt)
    },
    retrieve(userId: UUID, prompt: string) {
        return memoryService.retrieveMemories(userId, prompt)
    },
}