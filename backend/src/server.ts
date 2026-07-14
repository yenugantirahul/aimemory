import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./database/db.js";
import { toNodeHandler } from "better-auth/node";
import  chatRouter  from "./modules/chat/chat.routes.js";
import { auth } from "./auth.js";
import { qdrantService } from "./clients/qdrant.client.js";

const PORT = process.env.PORT || 5000;
app.all("/api/auth/*path", toNodeHandler(auth));
app.use("/api/chat", chatRouter);

await qdrantService.createCollection()

async function start() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
