"use client";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import StarField from "@/components/StarField";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const events = [
  {
    title: "Intro to CubeSat Workshop",
    type: "Workshop",
    status: "upcoming",
    date: "Jan 15, 2025",
    time: "10:00 AM – 4:00 PM",
    location: "College Lab, Block A",
    capacity: "30 seats",
    description: "Learn the fundamentals of CubeSat design — power systems, comms, structure, and payload. Hands-on session with real hardware.",
    color: "border-blue-400/50",
    badge: "text-blue-400 bg-blue-400/10",
  },
  {
    title: "Astronomy Night — Saturn Opposition",
    type: "Observation",
    status: "upcoming",
    date: "Jan 22, 2025",
    time: "8:00 PM – 11:00 PM",
    location: "College Rooftop",
    capacity: "50 seats",
    description: "Saturn is at its closest to Earth. Join us for a live observation through our 10-inch reflector telescope.",
    color: "border-purple-400/50",
    badge: "text-purple-400 bg-purple-400/10",
  },
  {
    title: "NASA Space Apps Hackathon Prep",
    type: "Hackathon",
    status: "upcoming",
    date: "Feb 5, 2025",
    time: "9:00 AM – 5:00 PM",
    location: "Seminar Hall",
    capacity: "60 seats",
    description: "Team formation, problem statement analysis, mock pitches, and review from mentors. Full-day prep for NASA Space Apps.",
    color: "border-orange-400/50",
    badge: "text-orange-400 bg-orange-400/10",
  },
  {
    title: "Space Careers Webinar",
    type: "Webinar",
    status: "upcoming",
    date: "Feb 12, 2025",
    time: "6:00 PM – 8:00 PM",
    location: "Online (Google Meet)",
    capacity: "Unlimited",
    description: "Panel of ISRO scientists, space startup founders, and IIT researchers discuss career paths in the Indian space sector.",
    color: "border-cyan-400/50",
    badge: "text-cyan-400 bg-cyan-400/10",
  },
  {
    title: "CanSat 2024 Launch Event",
    type: "Mission",
    status: "past",
    date: "Oct 20, 2024",
    time: "8:00 AM – 5:00 PM",
    location: "Sports Ground, Campus",
    capacity: "Full",
    description: "Successful launch and recovery of our CanSat mission. Collected atmospheric data from 1km altitude. Finished in national top 5.",
    color: "border-green-400/50",
    badge: "text-green-400 bg-green-400/10",
  },
  {
    title: "ISRO Visit — Thiruvananthapuram",
    type: "Visit",
    status: "past",
    date: "Sep 5, 2024",
    time: "All Day",
    location: "VSSC, Thiruvananthapuram",
    capacity: "25 students",
    description: "Students toured VSSC facilities, attended presentations by ISRO scientists, and interacted with the satellite assembly team.",
    color: "border-yellow-400/50",
    badge: "text-yellow-400 bg-yellow-400/10",
  },
];

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filtered = events.filter((e) => filter === "all" ? true : e.status === filter);

  return (
    <div className="min-h-screen bg-[#050a14] pt-24">
      <section className="relative py-20 overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">
            Events
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Events & <span className="gradient-text">Activities</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Workshops, observations, hackathons, visits, and webinars — all year round.
          </p>
        </div>
      </section>

      <section className="py-12 pb-24 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-10">
          {(["all", "upcoming", "past"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {filtered.map((ev) => (
            <div
              key={ev.title}
              className={`glass rounded-2xl p-6 border-l-4 ${ev.color} glass-hover`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ev.badge}`}>
                      {ev.type}
                    </span>
                    {ev.status === "past" && (
                      <span className="text-xs px-2 py-0.5 rounded-full text-slate-500 bg-white/5">Past</span>
                    )}
                  </div>
                  <h2 className="text-white font-bold text-lg mb-2">{ev.title}</h2>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{ev.description}</p>
                  <div className="flex flex-wrap gap-4 text-slate-400 text-xs">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {ev.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {ev.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {ev.location}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {ev.capacity}</span>
                  </div>
                </div>
                {ev.status === "upcoming" && (
                  <div className="shrink-0">
                    <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-all">
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
