import express from "express";

import portfolioContent from "../config/portfolioContent.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(portfolioContent);
});

export default router;
