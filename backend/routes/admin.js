const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Member = require("../models/Member");
const Contact = require("../models/Contact");
const CoreMember = require("../models/CoreMember");

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
  } catch { res.status(500).json({ error: "Server error." }); }
});

// PATCH update status of a join application
router.patch("/applications/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Member.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!app) return res.status(404).json({ error: "Not found." });
    res.json(app);
  } catch { res.status(500).json({ error: "Server error." }); }
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
  } catch { res.status(500).json({ error: "Server error." }); }
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
// GET all core members
router.get("/core-members", auth, async (req, res) => {
  try {
    const list = await CoreMember.find().sort({ order: 1, createdAt: 1 });
    res.json(list);
  } catch { res.status(500).json({ error: "Server error." }); }
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
    const [totalApps, pendingApps, approvedApps, totalMessages, unreadMessages, coreMembers] = await Promise.all([
      Member.countDocuments(),
      Member.countDocuments({ status: "pending" }),
      Member.countDocuments({ status: "approved" }),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false }),
      CoreMember.countDocuments(),
    ]);
    res.json({ totalApps, pendingApps, approvedApps, totalMessages, unreadMessages, coreMembers });
  } catch { res.status(500).json({ error: "Server error." }); }
});

module.exports = router;
