import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, ArrowRight, Clock } from "lucide-react";

const events = [
  { day: "15", month: "JAN", title: "Intro to CubeSat Workshop", type: "Workshop", location: "College Lab, Block A", time: "10:00 AM – 4:00 PM", color: "border-blue-400/50", badge: "text-blue-400 bg-blue-400/10" },
  { day: "22", month: "JAN", title: "Astronomy Night — Saturn Opposition", type: "Observation", location: "College Rooftop", time: "8:00 PM – 11:00 PM", color: "border-purple-400/50", badge: "text-purple-400 bg-purple-400/10" },
  { day: "05", month: "FEB", title: "NASA Space Apps Hackathon Prep", type: "Hackathon", location: "Seminar Hall", time: "9:00 AM – 5:00 PM", color: "border-orange-400/50", badge: "text-orange-400 bg-orange-400/10" },
];

export default function UpcomingEvents() {
  return (
    <section className="py-24 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Events" title="What's Coming Up" subtitle="Stay in the loop. Join us for workshops, observations, hackathons, and more." />
        <div className="space-y-4 mb-10">
          {events.map((ev) => (
            <div key={ev.title} className={`glass rounded-2xl p-5 border-l-4 ${ev.color} flex flex-col sm:flex-row gap-5 sm:items-center glass-hover`}>
              <div className="text-center min-w-[60px]">
                <div className="text-2xl font-extrabold" style={{ color: "var(--text)" }}>{ev.day}</div>
                <div className="text-xs text-blue-400 font-medium">{ev.month}</div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold" style={{ color: "var(--text)" }}>{ev.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ev.badge}`}>{ev.type}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1"><Clock size={12} /> {ev.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {ev.location}</span>
                </div>
              </div>
              <Link href="/events" className="shrink-0 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/30 text-blue-300 text-xs font-medium rounded-lg transition-all">
                Register
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/events" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
            View all events <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
