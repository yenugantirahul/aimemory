import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Your Next.js frontend
    credentials: true,               // Required if using cookies
  })
);
app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
  });
});

export default app;