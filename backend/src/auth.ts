import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database/db.js";
import * as schema from "./database/schema.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.CORS_ORIGIN_URL!],
  advanced: {
    defaultCookieAttributes: {
      sameSite: process.env.NODE_ENV === "production" || process.env.CORS_ORIGIN_URL?.startsWith("https://") ? "none" : "lax",
      secure: process.env.NODE_ENV === "production" || process.env.CORS_ORIGIN_URL?.startsWith("https://") ? true : false,
    },
  },
});