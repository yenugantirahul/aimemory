import express from "express";
import cors from "cors";
import helmet from "helmet";
import { toNodeHandler } from "better-auth/node";
import { serverEnv } from "./config/server-env.js";
import { auth } from "./auth.js";
import chatRouter from "./modules/chat/chat.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";

const app = express();

// Render (and the Vercel proxy) sit in front of us.
app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(helmet());

// Browsers normally reach us through the frontend's /api proxy (same-origin),
// so CORS only matters for direct calls, e.g. local dev without the proxy.
app.use(
  cors({
    origin: serverEnv.allowedOrigins,
    credentials: true,
  }),
);

// better-auth parses its own body, so it must be mounted before express.json().
app.all("/api/auth/*path", toNodeHandler(auth));

app.use(
  express.json({
    limit: "64kb",
  }),
);

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
  });
});

app.use("/api/chat", chatRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
