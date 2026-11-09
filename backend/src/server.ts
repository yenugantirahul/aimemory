import "dotenv/config";

import app from "./app.js";
import { serverEnv } from "./config/server-env.js";
import { connectDB } from "./database/db.js";
import { qdrantService } from "./clients/qdrant.client.js";
import { neo4jService } from "./clients/neo4j.client.js";

async function start() {
  try {
    await connectDB();

    // Don't let a vector/graph-DB hiccup keep the whole API down.
    const [qdrantSetup, neo4jSetup] = await Promise.allSettled([
      qdrantService.createCollection(),
      neo4jService.setup(),
    ]);
    if (qdrantSetup.status === "rejected") {
      console.error("Qdrant setup failed (continuing):", qdrantSetup.reason);
    }
    if (neo4jSetup.status === "rejected") {
      console.error("Neo4j setup failed (continuing):", neo4jSetup.reason);
    }

    app.listen(serverEnv.PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on ${serverEnv.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
