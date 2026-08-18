const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

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

    // You can either store registrations in the Event model or create a separate Registration model
    // For now, we'll just return success - you can extend this to save to database
    
    // TODO: Save registration to database
    // Example: await EventRegistration.create({ name, email, phone, regNumber, branch, year, division, eventId, eventTitle });

    // TODO: Send confirmation email
    console.log("Event registration:", { name, email, phone, eventTitle });

    res.status(201).json({ message: "Registration successful!" });
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
