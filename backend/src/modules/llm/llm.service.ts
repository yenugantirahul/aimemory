import { GeminiService } from "../../clients/gemini.client.js";

const gemini = new GeminiService();
export const llmService = {
  async getAiResponse(prompt: string) {
    const res = await gemini.generate(prompt);
    return res;
  },
  streamAiResponse(prompt: string, signal?: AbortSignal) {
    return gemini.generateStream(prompt, signal);
  },
  async generateEmbedding(text: string) {
    const res = await gemini.generateEmdb(text);
    return res;
  },
  async generateRelationships(text: string) {
    const res = await gemini.extractRelationships(text);
    return res;
  },
};
