import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database/db.js";
import * as schema from "./database/schema.js";
import { allowedOrigins } from "./config.js";

// The frontend proxies /api/* to this server, so BETTER_AUTH_URL is the
// public frontend URL (e.g. https://your-app.vercel.app). Cookies are then
// first-party on that domain; better-auth makes them Secure when it's https.
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: "/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: allowedOrigins,
});
