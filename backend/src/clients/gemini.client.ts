import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    this.ai = new GoogleGenAI({
      apiKey,
    });
  }

  async generate(prompt: string, modelName: string) {
    const response = await this.ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    return response.text;
  }

  async generateEmdb(prompt: string, modelName: string): Promise<number[]> {
    const response = await this.ai.models.embedContent({
      model: modelName,
      contents: prompt,
    });
    const embedding = response.embeddings?.[0]?.values;

    if (!embedding) {
      throw new Error("Failed to generate embedding");
    }

    return embedding;
  }
}
