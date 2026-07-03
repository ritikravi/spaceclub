const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Member = require("../models/Member");
const Contact = require("../models/Contact");
const CoreMember = require("../models/CoreMember");
const Student = require("../models/Student");
const Announcement = require("../models/Announcement");
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
      await sendEmail(app.email, "🚀 You're In! Welcome to LPU Space Club", `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0">
          <div style="background:linear-gradient(135deg,#1d4ed8,#0ea5e9);padding:36px 32px;text-align:center">
            <div style="font-size:48px;margin-bottom:8px">🚀</div>
            <h1 style="color:white;margin:0;font-size:24px;font-weight:800">Welcome to LPU Space Club!</h1>
            <p style="color:#bfdbfe;margin:8px 0 0;font-size:14px">Centre for Space Science · Lovely Professional University</p>
          </div>
          <div style="padding:32px">
            <p style="color:#334155;font-size:16px;margin:0 0 16px">Hi <strong>${app.name}</strong>,</p>
            <p style="color:#334155;font-size:15px;line-height:1.6">Your application has been <strong style="color:#16a34a">✅ Approved!</strong> You are now an official member of LPU Space Club.</p>
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin:20px 0">
              <p style="margin:0;color:#166534;font-size:14px">🎉 <strong>+50 Welcome Points</strong> have been added to your account!</p>
              <p style="margin:8px 0 0;color:#166534;font-size:13px">Division: <strong>${app.division || "General"}</strong></p>
            </div>
            <p style="color:#64748b;font-size:14px;line-height:1.6">Log in to your dashboard to see your profile, register for events, join projects, and start earning more points.</p>
            <div style="text-align:center;margin:28px 0">
              <a href="${process.env.FRONTEND_URL || "https://spaceclub-sigma.vercel.app"}/dashboard" style="display:inline-block;padding:14px 32px;background:#1d4ed8;color:white;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px">Go to My Dashboard →</a>
            </div>
          </div>
          <div style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center">
            <p style="color:#94a3b8;font-size:12px;margin:0">LPU Space Club · Centre for Space Science · Lovely Professional University</p>
            <p style="color:#cbd5e1;font-size:11px;margin:4px 0 0">Phagwara, Punjab 144411</p>
          </div>
        </div>
      `);
    } else if (status === "rejected") {
      await sendEmail(app.email, "LPU Space Club — Application Update", `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0">
          <div style="background:linear-gradient(135deg,#1d4ed8,#0ea5e9);padding:36px 32px;text-align:center">
            <div style="font-size:48px;margin-bottom:8px">📋</div>
            <h1 style="color:white;margin:0;font-size:24px;font-weight:800">Application Update</h1>
            <p style="color:#bfdbfe;margin:8px 0 0;font-size:14px">LPU Space Club · Centre for Space Science</p>
          </div>
          <div style="padding:32px">
            <p style="color:#334155;font-size:16px;margin:0 0 16px">Hi <strong>${app.name}</strong>,</p>
            <p style="color:#334155;font-size:15px;line-height:1.6">Thank you for your interest in LPU Space Club. After reviewing your application, we are unable to offer membership at this time.</p>
            <p style="color:#334155;font-size:15px;line-height:1.6">We encourage you to attend our upcoming events, build your skills, and reapply next semester. Many of our best members joined after their second application!</p>
            <div style="background:#fef9c3;border:1px solid #fde047;border-radius:12px;padding:16px;margin:20px 0">
              <p style="margin:0;color:#854d0e;font-size:14px">💡 Tip: Attend our workshops and events before applying again — it will strengthen your application significantly.</p>
            </div>
            <div style="text-align:center;margin:28px 0">
              <a href="${process.env.FRONTEND_URL || "https://spaceclub-sigma.vercel.app"}/events" style="display:inline-block;padding:14px 32px;background:#1d4ed8;color:white;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px">Explore Upcoming Events →</a>
            </div>
          </div>
          <div style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center">
            <p style="color:#94a3b8;font-size:12px;margin:0">LPU Space Club · Centre for Space Science · Lovely Professional University</p>
          </div>
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

// ── ANNOUNCEMENTS ─────────────────────────────────────
// GET active announcements (public)
router.get("/announcements", async (req, res) => {
  try {
    const list = await Announcement.find({ active: true }).sort({ createdAt: -1 }).limit(5);
    res.json(list);
  } catch { res.json([]); }
});

// GET all announcements (admin)
router.get("/announcements/all", auth, async (req, res) => {
  try {
    const list = await Announcement.find().sort({ createdAt: -1 });
    res.json(list);
  } catch { res.json([]); }
});

// POST create announcement
router.post("/announcements", auth, async (req, res) => {
  try {
    const { title, message, type } = req.body;
    if (!title || !message) return res.status(400).json({ error: "Title and message required." });
    const a = await Announcement.create({ title, message, type });
    res.status(201).json(a);
  } catch { res.status(500).json({ error: "Server error." }); }
});

// PATCH toggle announcement active
router.patch("/announcements/:id", auth, async (req, res) => {
  try {
    const a = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(a);
  } catch { res.status(500).json({ error: "Server error." }); }
});

// DELETE announcement
router.delete("/announcements/:id", auth, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted." });
  } catch { res.status(500).json({ error: "Server error." }); }
});

// ── BROADCAST ─────────────────────────────────────────
// POST broadcast notification to ALL approved students
router.post("/broadcast", auth, async (req, res) => {
  try {
    const { message, type } = req.body;
    if (!message) return res.status(400).json({ error: "Message required." });
    const students = await Student.find({ applicationStatus: "approved" });
    for (const s of students) {
      s.notifications.push({ message, type: type || "info" });
      await s.save();
    }
    res.json({ message: `Broadcast sent to ${students.length} members.`, count: students.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
