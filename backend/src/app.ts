import express from "express";
import cors from "cors";
import { allowedOrigins } from "./config.js";

const app = express();

// Render (and the Vercel proxy) sit in front of us.
app.set("trust proxy", 1);

// Browsers normally reach us through the frontend's /api proxy (same-origin),
// so CORS only matters for direct calls, e.g. local dev without the proxy.
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
  });
});

export default app;
