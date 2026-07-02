import SectionHeading from "@/components/SectionHeading";
import { Rocket, Telescope, Brain, Code2, FlaskConical, Cpu } from "lucide-react";

const items = [
  { icon: Rocket, title: "Space Missions", desc: "Build real CubeSats, CanSats, rockets, and ground stations under expert mentorship.", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Telescope, title: "Astronomy Nights", desc: "Observe planets, meteor showers, eclipses, and photograph the night sky.", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: Brain, title: "AI & Remote Sensing", desc: "Apply ML and GIS to analyze satellite imagery, climate data, and geospatial problems.", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Cpu, title: "Embedded Systems", desc: "Work with Arduino, ESP32, STM32, PCB design, and sensor integration.", color: "text-green-500", bg: "bg-green-50" },
  { icon: FlaskConical, title: "Research Cell", desc: "Read papers, publish research, file patents, and build prototypes with guidance.", color: "text-pink-500", bg: "bg-pink-50" },
  { icon: Code2, title: "Hackathon Prep", desc: "Train for ISRO, NASA Space Apps, SIH with team formation, mock reviews, and coaching.", color: "text-cyan-500", bg: "bg-cyan-50" },
];

export default function WhatWeDo() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="What We Do" title="More Than a Club" subtitle="We're a full-stack innovation ecosystem. From learning the basics to competing globally." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="glass glass-hover rounded-2xl p-6">
              <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                <item.icon size={22} className={item.color} />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
