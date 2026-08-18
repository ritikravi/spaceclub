const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const auth = require("../middleware/auth");

const CLOUD_NAME = (process.env.CLOUDINARY_CLOUD_NAME || "").trim().replace(/\s/g, "");
const API_KEY = (process.env.CLOUDINARY_API_KEY || "").trim().replace(/\s/g, "");
const API_SECRET = (process.env.CLOUDINARY_API_SECRET || "").trim().replace(/\s/g, "");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

// Debug — remove after testing
const router2 = express.Router ? null : null;
console.log("Cloudinary config:", {
  cloud_name: CLOUD_NAME || "MISSING",
  api_key: API_KEY ? "SET" : "MISSING",
  api_secret: API_SECRET ? "SET" : "MISSING",
  secret_len: API_SECRET.length,
});

// Use memory storage — no disk needed
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed."));
  },
});

// POST /api/upload — upload image to Cloudinary
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    const folder = req.query.folder === "events" ? "spaceclub/events" : "spaceclub/members";
    const transformation = req.query.folder === "events"
      ? [{ quality: "auto:best", fetch_format: "auto" }]  // events: preserve original quality, auto format
      : [{ width: 400, height: 400, crop: "fill", gravity: "face", quality: "auto:good" }]; // members: square crop

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder, transformation },
        (error, result) => { if (error) reject(error); else resolve(result); }
      ).end(req.file.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err.message || err);
    res.status(500).json({ error: err.message || "Upload failed." });
  }
});

module.exports = router;
