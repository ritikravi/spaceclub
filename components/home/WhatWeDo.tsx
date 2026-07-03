import SectionHeading from "@/components/SectionHeading";
import { Rocket, Telescope, Brain, Code2, FlaskConical, Cpu } from "lucide-react";

const items = [
  { icon: Rocket, title: "Space Missions", desc: "Build real CubeSats, CanSats, rockets, and ground stations under expert mentorship.", color: "text-orange-400", bg: "bg-orange-400/10" },
  { icon: Telescope, title: "Astronomy Nights", desc: "Observe planets, meteor showers, eclipses, and photograph the night sky.", color: "text-purple-400", bg: "bg-purple-400/10" },
  { icon: Brain, title: "AI & Remote Sensing", desc: "Apply ML and GIS to analyze satellite imagery, climate data, and geospatial problems.", color: "text-blue-400", bg: "bg-blue-400/10" },
  { icon: Cpu, title: "Embedded Systems", desc: "Work with Arduino, ESP32, STM32, PCB design, and sensor integration.", color: "text-green-400", bg: "bg-green-400/10" },
  { icon: FlaskConical, title: "Research Cell", desc: "Read papers, publish research, file patents, and build prototypes with guidance.", color: "text-pink-400", bg: "bg-pink-400/10" },
  { icon: Code2, title: "Hackathon Prep", desc: "Train for ISRO, NASA Space Apps, SIH with team formation, mock reviews, and coaching.", color: "text-cyan-400", bg: "bg-cyan-400/10" },
];

export default function WhatWeDo() {
  return (
    <section className="py-24 section-bg-alt">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <SectionHeading tag="What We Do" title="More Than a Club" subtitle="We're a full-stack innovation ecosystem. From learning the basics to competing globally." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="glass glass-hover rounded-2xl p-6">
              <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                <item.icon size={22} className={item.color} />
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
