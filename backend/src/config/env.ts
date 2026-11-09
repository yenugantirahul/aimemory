import "dotenv/config";
import { z } from "zod";

// Parses process.env against a schema and fails fast with a readable message.
export function loadEnv<T extends z.ZodType>(schema: T): z.infer<T> {
  const result = schema.safeParse(process.env);

  if (!result.success) {
    throw new Error(
      `Invalid environment configuration:\n${z.prettifyError(result.error)}`,
    );
  }

  return result.data;
}

// Variables needed by anything that talks to our data stores or the LLM.
// The Trigger.dev worker imports these clients too, so keep server-only
// settings (auth, CORS, port) in server-env.ts.
export const sharedEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  DATABASE_URL: z.url(),

  GEMINI_API_KEY: z.string().min(1),

  NEO4J_URI: z.string().min(1),
  NEO4J_USERNAME: z.string().min(1),
  NEO4J_PASSWORD: z.string().min(1),

  QDRANT_URL: z.url(),
  QDRANT_API_KEY: z.string().optional(),

  TRIGGER_SECRET_KEY: z.string().optional(),
});

const parsed = loadEnv(sharedEnvSchema);

export const env = {
  ...parsed,
  isProduction: parsed.NODE_ENV === "production",
};
