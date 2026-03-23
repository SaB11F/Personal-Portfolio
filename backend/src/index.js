import cors from "cors";
import "dotenv/config";
import express from "express";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB, isDatabaseReady } from "./lib/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.resolve(__dirname, "../../frontend/dist");

const app = express();
const PORT = process.env.PORT || 5000;
const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, "");
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
      .map(normalizeOrigin)
  : [];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || !allowedOrigins.length) {
      return callback(null, true);
    }

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

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);

if (existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  app.get(/^\/(?!api).*/, (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    return res.sendFile(path.join(frontendDist, "index.html"));
  });
}

app.listen(PORT, async () => {
  console.log(`Portfolio API listening on port ${PORT}`);
  await connectDB();
});

