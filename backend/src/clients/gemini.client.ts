import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { env } from "../config/env.js";
import { Graph, graphSchema } from "../schemas/memory.schema.js";

export type { Entity, Relationship, Graph } from "../schemas/memory.schema.js";

const CHAT_MODEL = "gemini-3.1-flash-lite";

// Chat replies don't need deep reasoning; minimal thinking cuts
// time-to-first-token from several seconds to under one.
const chatThinkingConfig = { thinkingLevel: ThinkingLevel.MINIMAL };

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    });
  }

  // Generates a normal text response
  async generate(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: CHAT_MODEL,
      contents: prompt,
      config: { thinkingConfig: chatThinkingConfig },
    });

    return response.text ?? "";
  }

  // Streams a text response chunk by chunk; aborting the signal stops generation.
  async *generateStream(
    prompt: string,
    signal?: AbortSignal,
  ): AsyncGenerator<string> {
    const stream = await this.ai.models.generateContentStream({
      model: CHAT_MODEL,
      contents: prompt,
      config: { abortSignal: signal, thinkingConfig: chatThinkingConfig },
    });

    for await (const chunk of stream) {
      if (chunk.text) yield chunk.text;
    }
  }

  // Extract entities and relationships
  async extractRelationships(memory: string): Promise<Graph> {
    const prompt = `
You are an information extraction system.

Extract all entities and relationships from the following text.

Return ONLY valid JSON.

Schema:

{
  "entities": [
    {
      "name": "string",
      "type": "string"
    }
  ],
  "relationships": [
    {
  "relation": "string";
  "entity": "string";
  "entityType": "string";
}
  ]
}

Rules:
- Return valid JSON only.
- No markdown.
- No explanations.
- Relationship names must be uppercase.
- Do not invent information.

Text:
${memory}
`;

    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error("Gemini returned invalid JSON for relationships.");
    }

    const graph = graphSchema.safeParse(json);

    if (!graph.success) {
      throw new Error(
        `Gemini returned an unexpected relationships shape: ${graph.error.message}`,
      );
    }

    return graph.data;
  }

  // Generates embeddings
  async generateEmdb(prompt: string): Promise<number[]> {
    const response = await this.ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: prompt,
    });

    const embedding = response.embeddings?.[0]?.values;

    if (!embedding) {
      throw new Error("Failed to generate embedding");
    }

    return embedding;
  }
}
