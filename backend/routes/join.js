const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// POST /api/join — submit membership application
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, year, branch, division, why } = req.body;

    if (!name || !email || !year || !branch || !division || !why) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const existing = await Member.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "This email has already applied." });
    }

    const member = await Member.create({ name, email, phone, year, branch, division, why });
    res.status(201).json({ message: "Application received! We'll confirm within 48 hours.", id: member._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// GET /api/join — list all applications (admin use)
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
