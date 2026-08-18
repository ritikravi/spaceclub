const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");

// GET /api/events — list all events
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const events = await Event.find(filter).sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// POST /api/events/register — register for an event
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, regNumber, branch, year, division, eventId, eventTitle } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    // Check if already registered
    const existing = await EventRegistration.findOne({ email, eventTitle });
    if (existing) {
      return res.status(409).json({ error: "You are already registered for this event." });
    }

    // Save registration
    const registration = await EventRegistration.create({
      eventId,
      eventTitle,
      name,
      email,
      phone,
      regNumber,
      branch,
      year,
      division,
      status: "registered",
    });

    res.status(201).json({ message: "Registration successful!", registration });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// POST /api/events/:id/register — legacy endpoint (keep for compatibility)
router.post("/:id/register", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email required." });

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found." });

    const alreadyRegistered = event.registrations.some((r) => r.email === email);
    if (alreadyRegistered) return res.status(409).json({ error: "Already registered." });

    event.registrations.push({ name, email });
    await event.save();

    res.status(201).json({ message: "Registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
