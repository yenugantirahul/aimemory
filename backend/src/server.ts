import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./database/db.js";
import { toNodeHandler } from "better-auth/node";
import express from "express";
import  chatRouter  from "./modules/chat/chat.routes.js";
import { auth } from "./auth.js";
import { qdrantService } from "./clients/qdrant.client.js";

const PORT = Number(process.env.PORT) || 5000;
app.all("/api/auth/*path", toNodeHandler(auth));
app.use(express.json());
app.use("/api/chat", chatRouter);

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  },
);

async function start() {
  try {
    await connectDB();

    // Don't let a vector-DB hiccup keep the whole API down.
    try {
      await qdrantService.createCollection();
    } catch (err) {
      console.error("Qdrant setup failed (continuing):", err);
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
