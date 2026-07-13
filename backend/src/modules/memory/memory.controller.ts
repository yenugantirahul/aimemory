import { memoryService } from "./memory.service.js"

export const memoryController = {
   async remember(prompt: string) {
        return memoryService.rememberMemories(prompt)
    },
    retrieve() {
        return memoryService.retrieveMemories()
    },
}