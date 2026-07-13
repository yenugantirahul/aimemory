import { memoryService } from "./memory.service.js"

export const memoryController = {
    remember() {
        return memoryService.rememberMemories()
    },
    retrieve() {
        return memoryService.retrieveMemories()
    }
}