import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, ArrowRight, Clock } from "lucide-react";

const events = [
  { day: "15", month: "JAN", title: "Intro to CubeSat Workshop", type: "Workshop", location: "Block 32, LPU", time: "10:00 AM – 4:00 PM", typeColor: "text-blue-600 bg-blue-100" },
  { day: "22", month: "JAN", title: "Astronomy Night — Saturn Opposition", type: "Observation", location: "LPU Rooftop Observatory", time: "8:00 PM – 11:00 PM", typeColor: "text-purple-600 bg-purple-100" },
  { day: "05", month: "FEB", title: "NASA Space Apps Hackathon Prep", type: "Hackathon", location: "Auditorium, LPU", time: "9:00 AM – 5:00 PM", typeColor: "text-orange-600 bg-orange-100" },
];

export default function UpcomingEvents() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Events" title="What's Coming Up" subtitle="Stay in the loop. Join us for workshops, observations, hackathons, and more." />
        <div className="space-y-4 mb-10">
          {events.map((ev) => (
            <div key={ev.title} className="glass glass-hover rounded-2xl p-5 border-l-4 border-orange-400 flex flex-col sm:flex-row gap-5 sm:items-center">
              <div className="text-center min-w-[56px] bg-orange-50 rounded-xl py-2">
                <div className="text-2xl font-extrabold text-orange-500">{ev.day}</div>
                <div className="text-xs text-orange-400 font-semibold">{ev.month}</div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-gray-900 font-semibold">{ev.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ev.typeColor}`}>{ev.type}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-gray-400 text-xs">
                  <span className="flex items-center gap-1"><Clock size={12} /> {ev.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {ev.location}</span>
                </div>
              </div>
              <Link href="/events" className="shrink-0 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-all">
                Register
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/events" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors">
            View all events <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
