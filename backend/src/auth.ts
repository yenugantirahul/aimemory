import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database/db.js";
import * as schema from "./database/schema.js";
import { serverEnv } from "./config/server-env.js";

// The frontend proxies /api/* to this server, so BETTER_AUTH_URL is the
// public frontend URL (e.g. https://your-app.vercel.app). Cookies are then
// first-party on that domain; better-auth makes them Secure when it's https.
export const auth = betterAuth({
  baseURL: serverEnv.BETTER_AUTH_URL,
  secret: serverEnv.BETTER_AUTH_SECRET,
  basePath: "/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Cache the session in a signed cookie so most requests skip the DB lookup.
  // A revoked session can stay valid for up to maxAge.
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  trustedOrigins: serverEnv.allowedOrigins,
});
