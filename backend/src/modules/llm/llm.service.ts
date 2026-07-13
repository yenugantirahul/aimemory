import { GeminiService } from "../../clients/gemini.client.js";

const gemini = new GeminiService();
export const llmService = {
  async getAiResponse(prompt: string) {
    const res = await gemini.generate(prompt, "gemini-3.1-flash-lite");
    return res;
  },
  async  generateEmbedding(text: string) {
     const res = await gemini.generateEmdb(text, "gemini-embedding-2");
    return res;
  }
};
