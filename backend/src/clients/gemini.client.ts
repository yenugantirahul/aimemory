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

  async generate(prompt: string) {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    return response.text;
  }
}