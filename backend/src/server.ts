import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./database/db.js";
import { toNodeHandler } from "better-auth/node";

import {auth} from "./auth.js"

const PORT = process.env.PORT || 5000;
app.all("/api/auth/*path", toNodeHandler(auth));
async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
}

start();
