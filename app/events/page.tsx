"use client";
import { useState } from "react";
import StarField from "@/components/StarField";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const events = [
  {
    id: "national-space-day-2026",
    title: "National Space Day 2026 — Celebration",
    type: "University Event",
    status: "upcoming",
    date: "Aug 21, 2026",
    time: "10:00 AM – 5:00 PM",
    location: "Room 30-603 & 604, LPU",
    capacity: "All Schools of LPU",
    description: "Celebration of National Space Day 2026 organized by Centre for Space Science (CSS), R&D Cell, Lovely Professional University. Features Inter-School Space Innovation Expo, Geospatial Innovation Challenge & Satellite Data Showcase, Space Debate Championship, and a keynote by Dr. Rishitosh K. Sinha (PRL, Ahmedabad). For registration queries: 9463457100 / 9897120653.",
    color: "border-orange-400/50",
    badge: "text-orange-400 bg-orange-400/10",
  },
];

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filtered = events.filter((e) => filter === "all" ? true : e.status === filter);

  return (
    <div className="min-h-screen bg-[#050a14]">
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
              key={ev.id}
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
                    <a
                      href="/events/register"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-orange-500/30 hover:scale-105"
                    >
                      Register Now →
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="glass rounded-2xl p-6 mt-8 border-l-4 border-blue-400/50">
          <h3 className="text-white font-semibold mb-2">About Event Registration</h3>
          <ul className="text-slate-400 text-sm space-y-1">
            <li className="flex items-center gap-2">✅ Click "Register Now" to fill out the registration form</li>
            <li className="flex items-center gap-2">✅ Provide your name, email, phone, and academic details</li>
            <li className="flex items-center gap-2">✅ Receive confirmation via email once registered</li>
            <li className="flex items-center gap-2">✅ For queries contact: 9463457100 / 9897120653</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
