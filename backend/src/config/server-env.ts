import { z } from "zod";
import { env, loadEnv, sharedEnvSchema } from "./env.js";

const serverEnvSchema = sharedEnvSchema.extend({
  PORT: z.coerce.number().int().positive().max(65535).default(5000),

  // Comma-separated list of frontend origins, e.g.
  // "https://your-app.vercel.app,http://localhost:3000"
  CORS_ORIGIN_URL: z.string().min(1).default("http://localhost:3000"),

  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32),
});

const parsed = loadEnv(serverEnvSchema);

export const serverEnv = {
  ...env,
  ...parsed,
  allowedOrigins: parsed.CORS_ORIGIN_URL.split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean),
};
