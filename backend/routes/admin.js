const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Member = require("../models/Member");
const Contact = require("../models/Contact");
const CoreMember = require("../models/CoreMember");
const Student = require("../models/Student");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_FROM, pass: process.env.EMAIL_PASS },
});

async function sendEmail(to, subject, html) {
  if (!process.env.EMAIL_FROM) return;
  try { await transporter.sendMail({ from: `"LPU Space Club" <${process.env.EMAIL_FROM}>`, to, subject, html }); }
  catch (e) { console.error("Email:", e.message); }
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "spaceclub2024";
const JWT_SECRET = process.env.JWT_SECRET || "spaceclub_secret";

// ── POST /api/admin/login ──────────────────────────────
router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD)
    return res.status(401).json({ error: "Wrong password." });
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
  res.json({ token });
});

// ── JOIN REQUESTS ──────────────────────────────────────
// GET all join applications
router.get("/applications", auth, async (req, res) => {
  try {
    const apps = await Member.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    console.error("Applications error:", err);
    res.json([]);
  }
});

// PATCH update status of a join application
router.patch("/applications/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Member.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!app) return res.status(404).json({ error: "Not found." });

    // Sync to Student + send email
    const student = await Student.findOne({ email: app.email });
    if (student) {
      student.applicationStatus = status;
      const msg = status === "approved"
        ? `🎉 Congratulations! Your application to LPU Space Club has been approved. Welcome aboard!`
        : `Your Space Club application has been reviewed. Unfortunately it was not approved this time. You can reapply next semester.`;
      student.notifications.push({ message: msg, type: status === "approved" ? "success" : "warning" });
      if (status === "approved") student.points += 50; // welcome points
      await student.save();
    }

    // Send email notification
    if (status === "approved") {
      await sendEmail(app.email, "🚀 Welcome to LPU Space Club!", `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0">
          <h2 style="color:#1d4ed8;margin-bottom:8px">Welcome to LPU Space Club! 🚀</h2>
          <p style="color:#334155;font-size:15px">Hi ${app.name},</p>
          <p style="color:#334155;font-size:15px">Your application has been <strong style="color:#16a34a">approved</strong>! You are now an official member of LPU Space Club.</p>
          <p style="color:#64748b;font-size:13px">Division: <strong>${app.division}</strong></p>
          <a href="https://spaceclub-sigma.vercel.app/dashboard" style="display:inline-block;margin-top:20px;padding:12px 28px;background:#1d4ed8;color:white;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px">Go to Your Dashboard →</a>
          <p style="color:#94a3b8;font-size:12px;margin-top:24px">LPU Space Club · Centre for Space Science</p>
        </div>
      `);
    } else if (status === "rejected") {
      await sendEmail(app.email, "LPU Space Club — Application Update", `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0">
          <h2 style="color:#1d4ed8">LPU Space Club</h2>
          <p style="color:#334155;font-size:15px">Hi ${app.name}, thank you for applying to LPU Space Club.</p>
          <p style="color:#334155;font-size:15px">After review, we are unable to approve your application at this time. We encourage you to reapply next semester.</p>
          <p style="color:#94a3b8;font-size:12px;margin-top:24px">LPU Space Club · Centre for Space Science</p>
        </div>
      `);
    }

    res.json(app);
  } catch (err) {
    console.error("Application update error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// DELETE a join application
router.delete("/applications/:id", auth, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted." });
  } catch { res.status(500).json({ error: "Server error." }); }
});

// ── CONTACT MESSAGES ───────────────────────────────────
// GET all contact messages
router.get("/messages", auth, async (req, res) => {
  try {
    const msgs = await Contact.find().sort({ createdAt: -1 });
    res.json(msgs);
  } catch (err) {
    console.error("Messages error:", err);
    res.json([]);
  }
});

// PATCH mark message as read
router.patch("/messages/:id/read", auth, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(msg);
  } catch { res.status(500).json({ error: "Server error." }); }
});

// DELETE a message
router.delete("/messages/:id", auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted." });
  } catch { res.status(500).json({ error: "Server error." }); }
});

// ── CORE MEMBERS ───────────────────────────────────────
// GET all core members (public — no auth)
router.get("/public-members", async (req, res) => {
  try {
    const list = await CoreMember.find().sort({ order: 1, createdAt: 1 })
      .select("name role division year avatar photo linkedin github type");
    res.json(list);
  } catch { res.status(500).json({ error: "Server error." }); }
});

// GET all core members (admin)
router.get("/core-members", auth, async (req, res) => {
  try {
    const list = await CoreMember.find().sort({ order: 1, createdAt: 1 });
    res.json(list);
  } catch (err) {
    console.error("Core members error:", err);
    res.json([]);
  }
});

// POST add core member
router.post("/core-members", auth, async (req, res) => {
  try {
    const { name, role, division, year, email, type, order } = req.body;
    if (!name || !role) return res.status(400).json({ error: "Name and role required." });
    const avatar = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const m = await CoreMember.create({ name, role, division, year, email, avatar, type, order });
    res.status(201).json(m);
  } catch { res.status(500).json({ error: "Server error." }); }
});

// PATCH edit core member
router.patch("/core-members/:id", auth, async (req, res) => {
  try {
    const m = await CoreMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!m) return res.status(404).json({ error: "Not found." });
    res.json(m);
  } catch { res.status(500).json({ error: "Server error." }); }
});

// DELETE core member
router.delete("/core-members/:id", auth, async (req, res) => {
  try {
    await CoreMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted." });
  } catch { res.status(500).json({ error: "Server error." }); }
});

// ── STATS ──────────────────────────────────────────────
router.get("/stats", auth, async (req, res) => {
  try {
    const [totalApps, pendingApps, approvedApps, totalMessages, unreadMessages, coreMembers] = await Promise.allSettled([
      Member.countDocuments(),
      Member.countDocuments({ status: "pending" }),
      Member.countDocuments({ status: "approved" }),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false }),
      CoreMember.countDocuments(),
    ]);
    res.json({
      totalApps: totalApps.status === "fulfilled" ? totalApps.value : 0,
      pendingApps: pendingApps.status === "fulfilled" ? pendingApps.value : 0,
      approvedApps: approvedApps.status === "fulfilled" ? approvedApps.value : 0,
      totalMessages: totalMessages.status === "fulfilled" ? totalMessages.value : 0,
      unreadMessages: unreadMessages.status === "fulfilled" ? unreadMessages.value : 0,
      coreMembers: coreMembers.status === "fulfilled" ? coreMembers.value : 0,
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.json({ totalApps:0, pendingApps:0, approvedApps:0, totalMessages:0, unreadMessages:0, coreMembers:0 });
  }
});

module.exports = router;
