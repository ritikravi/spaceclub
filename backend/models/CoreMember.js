const mongoose = require("mongoose");

const coreMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    division: { type: String, required: true },
    year: { type: String },
    email: { type: String, lowercase: true, trim: true },
    avatar: { type: String },
    type: { type: String, enum: ["faculty", "student-lead", "core"], default: "core" },
    order: { type: Number, default: 99 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoreMember", coreMemberSchema);
