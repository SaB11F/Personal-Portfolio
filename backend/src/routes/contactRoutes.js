import express from "express";

import { isDatabaseReady } from "../lib/db.js";
import { sendContactNotification } from "../lib/mailer.js";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

router.post("/", async (req, res) => {
  try {
    const { name, email, company, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email." });
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || "",
      subject: subject?.trim() || "",
      message: message.trim(),
    };

    let stored = false;
    let delivered = false;
    let deliveryWarning = "";

    if (isDatabaseReady()) {
      await ContactMessage.create(payload);
      stored = true;
    }

    try {
      const result = await sendContactNotification(payload);
      delivered = result.sent;
      deliveryWarning = result.reason || "";
    } catch (error) {
      deliveryWarning = error.message;
    }

    if (deliveryWarning) {
      console.warn("Contact delivery warning:", deliveryWarning);
    }

    if (!stored && !delivered) {
      return res.status(503).json({
        message: "Unable to save or send the message right now.",
        stored,
        delivered,
        warning: deliveryWarning,
      });
    }

    return res.status(201).json({
      message: delivered
        ? "Message sent successfully."
        : "Message saved successfully, but email delivery is currently unavailable.",
      stored,
      delivered,
      warning: deliveryWarning,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to process the contact request right now.",
      error: error.message,
    });
  }
});

export default router;
