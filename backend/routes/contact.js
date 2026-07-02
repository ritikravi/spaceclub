const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact — submit contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const entry = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: "Message received! We'll get back to you soon.", id: entry._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// GET /api/contact — list all messages (admin use)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
