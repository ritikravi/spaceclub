import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight } from "lucide-react";

const divisions = [
  { name: "Aerospace", emoji: "🚀", desc: "CubeSat, CanSat, Rocketry" },
  { name: "Robotics", emoji: "🤖", desc: "Rovers, Drones, Autonomous" },
  { name: "AI & Data", emoji: "🧠", desc: "ML, GIS, Remote Sensing" },
  { name: "Embedded", emoji: "⚡", desc: "Arduino, ESP32, PCB Design" },
  { name: "Software", emoji: "💻", desc: "Web, App, Cloud" },
  { name: "Research", emoji: "📄", desc: "Papers, Patents" },
  { name: "Astronomy", emoji: "🔭", desc: "Observation, Astrophotography" },
  { name: "Media", emoji: "🎨", desc: "Design, Content, CAD" },
];

export default function DivisionsPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Divisions" title="Find Your Specialty" subtitle="Join one or more specialized teams. Every division works on real problems." />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {divisions.map((d) => (
            <div key={d.name} className="glass glass-hover rounded-xl p-4 text-center cursor-pointer">
              <div className="text-2xl mb-2">{d.emoji}</div>
              <div className="text-gray-800 font-semibold text-xs">{d.name}</div>
              <div className="text-gray-400 text-[10px] mt-0.5 leading-tight">{d.desc}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/divisions" className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-semibold text-sm transition-colors">
            View all divisions <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
