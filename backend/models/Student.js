const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    photo: { type: String }, // from Google
    googleId: { type: String },
    year: { type: String },
    branch: { type: String },
    division: { type: String },
    bio: { type: String },
    skills: [String],
    linkedin: { type: String },
    github: { type: String },
    applicationStatus: { type: String, enum: ["not_applied", "pending", "approved", "rejected"], default: "not_applied" },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
    points: { type: Number, default: 0 },
    badges: [{ name: String, icon: String, earnedAt: Date }],
    registeredEvents: [{ eventId: String, title: String, registeredAt: { type: Date, default: Date.now }, attended: { type: Boolean, default: false } }],
    notifications: [{ message: String, type: { type: String, enum: ["info","success","warning","error"], default: "info" }, read: { type: Boolean, default: false }, createdAt: { type: Date, default: Date.now } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
