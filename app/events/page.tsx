"use client";
import { useState } from "react";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const events = [
  { title: "Intro to CubeSat Workshop", type: "Workshop", status: "upcoming", date: "Jan 15, 2025", time: "10:00 AM – 4:00 PM", location: "Block 32, LPU", capacity: "30 seats", description: "Learn the fundamentals of CubeSat design — power systems, comms, structure, and payload. Hands-on session with real hardware.", border: "border-blue-400", badge: "text-blue-600 bg-blue-100" },
  { title: "Astronomy Night — Saturn Opposition", type: "Observation", status: "upcoming", date: "Jan 22, 2025", time: "8:00 PM – 11:00 PM", location: "LPU Rooftop Observatory", capacity: "50 seats", description: "Saturn is at its closest to Earth. Join us for a live observation through our 10-inch reflector telescope.", border: "border-purple-400", badge: "text-purple-600 bg-purple-100" },
  { title: "NASA Space Apps Hackathon Prep", type: "Hackathon", status: "upcoming", date: "Feb 5, 2025", time: "9:00 AM – 5:00 PM", location: "Auditorium, LPU", capacity: "60 seats", description: "Team formation, problem statement analysis, mock pitches, and review from mentors. Full-day prep for NASA Space Apps.", border: "border-orange-400", badge: "text-orange-600 bg-orange-100" },
  { title: "Space Careers Webinar", type: "Webinar", status: "upcoming", date: "Feb 12, 2025", time: "6:00 PM – 8:00 PM", location: "Online (Google Meet)", capacity: "Unlimited", description: "Panel of ISRO scientists, space startup founders, and IIT researchers discuss career paths in the Indian space sector.", border: "border-cyan-400", badge: "text-cyan-600 bg-cyan-100" },
  { title: "CanSat 2024 Launch Event", type: "Mission", status: "past", date: "Oct 20, 2024", time: "8:00 AM – 5:00 PM", location: "Sports Ground, LPU", capacity: "Full", description: "Successful launch and recovery of our CanSat mission. Collected atmospheric data from 1km altitude. Finished in national top 5.", border: "border-green-400", badge: "text-green-600 bg-green-100" },
  { title: "ISRO Visit — Thiruvananthapuram", type: "Visit", status: "past", date: "Sep 5, 2024", time: "All Day", location: "VSSC, Thiruvananthapuram", capacity: "25 students", description: "Students toured VSSC facilities, attended presentations by ISRO scientists, and interacted with the satellite assembly team.", border: "border-yellow-400", badge: "text-yellow-600 bg-yellow-100" },
];

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const filtered = events.filter((e) => filter === "all" ? true : e.status === filter);

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-200 bg-white/20 rounded-full mb-4">Events</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Events & Activities</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Workshops, observations, hackathons, visits, and webinars — all year round.</p>
        </div>
      </section>

      <section className="py-12 pb-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-10">
          {(["all", "upcoming", "past"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${filter === f ? "bg-orange-500 text-white shadow-sm" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {filtered.map((ev) => (
            <div key={ev.title} className={`glass glass-hover rounded-2xl p-6 border-l-4 ${ev.border}`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ev.badge}`}>{ev.type}</span>
                    {ev.status === "past" && <span className="text-xs px-2 py-0.5 rounded-full text-gray-400 bg-gray-100">Past</span>}
                  </div>
                  <h2 className="text-gray-900 font-bold text-lg mb-2">{ev.title}</h2>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{ev.description}</p>
                  <div className="flex flex-wrap gap-4 text-gray-400 text-xs">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {ev.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {ev.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {ev.location}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {ev.capacity}</span>
                  </div>
                </div>
                {ev.status === "upcoming" && (
                  <div className="shrink-0">
                    <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
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
