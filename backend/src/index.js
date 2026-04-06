import cors from "cors";
import "dotenv/config";
import express from "express";

const REQUIRED_ENV_VARS = ["RESEND_API_KEY", "CONTACT_TO_EMAIL"];
const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(", ")}`);
  process.exit(1);
}

import { connectDB, isDatabaseReady } from "./lib/db.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== "production";
const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, "");
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
      .map(normalizeOrigin)
  : [];
const corsOptions = {
  origin: (origin, callback) => {
    // Same-origin or server-to-server requests (no Origin header) — always allow
    if (!origin) return callback(null, true);
    // In development with no CLIENT_URL set, allow everything for convenience
    if (isDev && !allowedOrigins.length) return callback(null, true);
    // In production, only allow explicitly listed origins
    if (allowedOrigins.includes(normalizeOrigin(origin))) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
  },
  optionsSuccessStatus: 204,
};

app.use(express.json({ limit: "1mb" }));
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: isDatabaseReady() ? "connected" : "disabled",
  });
});

app.use("/api/contact", contactRoutes);

app.listen(PORT, async () => {
  console.log(`Portfolio API listening on port ${PORT}`);
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
  }
});

