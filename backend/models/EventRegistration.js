const mongoose = require("mongoose");

const EventRegistrationSchema = new mongoose.Schema({
  // Event info
  eventId: String,
  eventTitle: String,
  
  // Student info
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  regNumber: String,
  branch: String,
  year: String,
  division: String,
  
  // Status
  status: { type: String, enum: ["registered", "attended", "cancelled"], default: "registered" },
  
  // Metadata
  registeredAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("EventRegistration", EventRegistrationSchema);
