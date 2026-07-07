import { defineConfig } from "drizzle-kit";
import dotnev from "dotenv";
dotnev.config();


export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
