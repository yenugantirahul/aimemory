import { GoogleGenAI } from "@google/genai";

export interface Entity {
  name: string;
  type: string;
}

export interface Relationship {
  relation: string;
  entity: string;
  entityType: string;
}

export interface Graph {
  entities: Entity[];
  relationships: Relationship[];
}

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

  // Generates a normal text response
  async generate(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    return response.text ?? "";
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

    return JSON.parse(text) as Graph;
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
