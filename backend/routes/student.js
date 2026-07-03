const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Member = require("../models/Member");
const nodemailer = require("nodemailer");

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, html) {
  if (!process.env.EMAIL_FROM) return; // skip if not configured
  try {
    await transporter.sendMail({ from: `"LPU Space Club" <${process.env.EMAIL_FROM}>`, to, subject, html });
  } catch (err) {
    console.error("Email error:", err.message);
  }
}

// GET /api/student/me — get or create student profile by email
router.get("/me", async (req, res) => {
  try {
    const { email, name, photo } = req.query;
    if (!email) return res.status(400).json({ error: "Email required." });

    let student = await Student.findOne({ email });
    if (!student) {
      student = await Student.create({ email, name: name || "", photo: photo || "" });
    } else {
      // Update photo/name from Google if changed
      if (photo && student.photo !== photo) { student.photo = photo; await student.save(); }
    }

    // Sync application status from Member collection
    const app = await Member.findOne({ email });
    if (app && student.applicationStatus !== app.status) {
      student.applicationStatus = app.status;
      student.applicationId = app._id;
      await student.save();
    }

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

// PATCH /api/student/me — update profile
router.patch("/me", async (req, res) => {
  try {
    const { email, ...updates } = req.body;
    if (!email) return res.status(400).json({ error: "Email required." });
    const student = await Student.findOneAndUpdate({ email }, updates, { new: true });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// POST /api/student/register-event — register for an event
router.post("/register-event", async (req, res) => {
  try {
    const { email, eventId, title } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ error: "Student not found." });

    const alreadyRegistered = student.registeredEvents.some(e => e.eventId === eventId);
    if (alreadyRegistered) return res.status(409).json({ error: "Already registered." });

    student.registeredEvents.push({ eventId, title });
    student.points += 5; // +5 points for registering
    student.notifications.push({ message: `You registered for "${title}"`, type: "success" });
    await student.save();

    res.json({ message: "Registered!", points: student.points });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// PATCH /api/student/mark-read — mark all notifications as read
router.patch("/mark-read", async (req, res) => {
  try {
    const { email } = req.body;
    await Student.updateOne({ email }, { $set: { "notifications.$[].read": true } });
    res.json({ message: "Marked read." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// POST /api/student/notify — admin sends notification to a student
router.post("/notify", async (req, res) => {
  try {
    const { email, message, type } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ error: "Student not found." });
    student.notifications.push({ message, type: type || "info" });
    await student.save();

    // Also send email
    await sendEmail(email, "LPU Space Club — New Notification", `
      <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:24px;border-radius:12px;border:1px solid #e2e8f0">
        <h2 style="color:#1d4ed8">LPU Space Club</h2>
        <p style="font-size:15px;color:#334155">${message}</p>
        <a href="https://spaceclub-sigma.vercel.app/dashboard" style="display:inline-block;margin-top:16px;padding:10px 20px;background:#1d4ed8;color:white;border-radius:8px;text-decoration:none;font-weight:600">View Dashboard</a>
      </div>
    `);

    res.json({ message: "Notification sent." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// GET /api/student/leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const students = await Student.find({ applicationStatus: "approved" })
      .sort({ points: -1 }).limit(20)
      .select("name email photo points badges division");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
