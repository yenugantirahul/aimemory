// Comma-separated list of frontend origins, e.g.
// "https://your-app.vercel.app,http://localhost:3000"
export const allowedOrigins = (process.env.CORS_ORIGIN_URL ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);
