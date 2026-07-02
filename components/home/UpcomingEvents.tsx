import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, ArrowRight, Clock } from "lucide-react";

const events = [
  { day: "15", month: "JAN", title: "Intro to CubeSat Workshop", type: "Workshop", location: "Block 32, LPU", time: "10:00 AM – 4:00 PM", dot: "bg-blue-500" },
  { day: "22", month: "JAN", title: "Astronomy Night — Saturn Opposition", type: "Observation", location: "LPU Rooftop Observatory", time: "8:00 PM – 11:00 PM", dot: "bg-purple-500" },
  { day: "05", month: "FEB", title: "NASA Space Apps Hackathon Prep", type: "Hackathon", location: "Auditorium, LPU", time: "9:00 AM – 5:00 PM", dot: "bg-indigo-500" },
];

export default function UpcomingEvents() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Events" title="What's Coming Up" subtitle="Workshops, observations, hackathons, and more — all year round." />
        <div className="space-y-3 mb-8">
          {events.map((ev) => (
            <div key={ev.title} className="glass glass-hover rounded-xl p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
              <div className="flex items-center gap-4 min-w-[80px]">
                <div className={`w-2 h-10 rounded-full ${ev.dot}`} />
                <div className="text-center">
                  <div className="text-xl font-extrabold text-gray-900">{ev.day}</div>
                  <div className="text-xs text-gray-400 font-medium">{ev.month}</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-gray-900 font-semibold text-sm">{ev.title}</h3>
                  <span className="text-xs text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full font-medium">{ev.type}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-gray-400 text-xs">
                  <span className="flex items-center gap-1"><Clock size={10} /> {ev.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={10} /> {ev.location}</span>
                </div>
              </div>
              <Link href="/events" className="shrink-0 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-all">
                Register
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/events" className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-semibold text-sm transition-colors">
            View all events <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
