// Script to add faculty members to the database
// Run from backend folder: node add-faculty.js

require("dotenv").config();
const mongoose = require("mongoose");
const CoreMember = require("./models/CoreMember");

const facultyMembers = [
  {
    name: "Dr. Jaisukh Paul",
    role: "Faculty Head",
    division: "Leadership",
    year: "Faculty",
    email: "",
    avatar: "JP",
    photo: "",
    linkedin: "",
    github: "",
    type: "faculty",
    order: 1,
  },
  {
    name: "Rohan Kumar",
    role: "Faculty Coordinator",
    division: "Leadership",
    year: "Faculty",
    email: "",
    avatar: "RK",
    photo: "",
    linkedin: "",
    github: "",
    type: "faculty",
    order: 2,
  },
];

async function addFaculty() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    // Check if they already exist
    for (const faculty of facultyMembers) {
      const exists = await CoreMember.findOne({ name: faculty.name });
      if (exists) {
        console.log(`⚠ ${faculty.name} already exists, skipping...`);
        continue;
      }
      await CoreMember.create(faculty);
      console.log(`✓ Added ${faculty.name} - ${faculty.role}`);
    }

    console.log("\n✅ Done! Faculty members added.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

addFaculty();
