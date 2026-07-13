import { GeminiService } from "../../clients/gemini.client.js";

const gemini = new GeminiService();
export const llmService = {
  async getAiResponse(prompt: string) {
    const res = await gemini.generate(prompt);
    return res;
  },
};
