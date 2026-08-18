const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String },
    location: { type: String },
    capacity: { type: String },
    description: { type: String },
    status: { type: String, enum: ["upcoming", "past"], default: "upcoming" },
    featured: { type: Boolean, default: false },
    image: { type: String }, // Cloudinary URL
    registrationContact: { type: String }, // e.g. phone number or link
    registrations: [{ name: String, email: String, registeredAt: { type: Date, default: Date.now } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
