import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight } from "lucide-react";

const divisions = [
  { name: "Aerospace", emoji: "🚀", desc: "CubeSat, CanSat, Rocketry, Orbital Mechanics" },
  { name: "Robotics", emoji: "🤖", desc: "Rovers, Drones, Autonomous Systems" },
  { name: "AI & Data", emoji: "🧠", desc: "ML, Computer Vision, GIS, Remote Sensing" },
  { name: "Embedded", emoji: "⚡", desc: "Arduino, ESP32, STM32, PCB Design" },
  { name: "Software", emoji: "💻", desc: "Web, App, Backend, Cloud Infrastructure" },
  { name: "Research", emoji: "📄", desc: "Papers, Patents, Literature Reviews" },
  { name: "Astronomy", emoji: "🔭", desc: "Observation, Astrophotography, Telescopes" },
  { name: "Media", emoji: "🎨", desc: "Design, Content, Photography, CAD" },
];

export default function DivisionsPreview() {
  return (
    <section className="py-24 bg-[#050a14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="Divisions"
          title="Find Your Specialty"
          subtitle="Join one or more specialized teams. Every division works on real problems and real projects."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {divisions.map((d) => (
            <div key={d.name} className="glass glass-hover rounded-2xl p-5 cursor-pointer">
              <div className="text-3xl mb-3">{d.emoji}</div>
              <h3 className="text-white font-semibold mb-1">{d.name}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/divisions"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
          >
            View all divisions <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
