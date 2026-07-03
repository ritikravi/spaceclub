import Link from "next/link";
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
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left — sticky title block */}
          <div className="lg:w-1/3 lg:sticky lg:top-28">
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">What We Do</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight" style={{ color: "var(--text)" }}>
              More Than<br />a Club
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              At LPU Space Club, our activities go beyond classroom training. We conduct Space Camps, Sky Safaris, hackathons, research programs, and weekly webinars connecting students with global professionals.
            </p>
            <Link href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold rounded-xl transition-all text-sm">
              Explore More →
            </Link>
          </div>

          {/* Right — cards grid */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5">
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
      </div>
    </section>
  );
}
