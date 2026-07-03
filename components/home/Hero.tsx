"use client";
import Link from "next/link";
import StarField from "@/components/StarField";
import { ArrowRight, Play, Satellite, Telescope, Cpu, MapPin, Award, Users } from "lucide-react";

const lpuTags = [
  { label: "Lovely Professional University", icon: "🎓" },
  { label: "Phagwara, Punjab", icon: "📍" },
  { label: "Official Student Club", icon: "✅" },
  { label: "Registered Space Innovators", icon: "🛰️" },
];

const badges = [
  { icon: Satellite, label: "Satellite Projects" },
  { icon: Telescope, label: "Astronomy Nights" },
  { icon: Cpu, label: "Embedded Systems" },
  { icon: Users, label: "500+ Members" },
  { icon: Award, label: "ISRO Hackathons" },
  { icon: MapPin, label: "LPU Campus" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-bg">
      <StarField />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">

        {/* LPU Official Header */}
        <div className="mb-8">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="text-6xl sm:text-7xl">🚀</div>
              <div className="text-left">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight" style={{ color: "var(--text)" }}>
                  LPU <span className="text-blue-400">Space Club</span>
                </div>
                <div className="text-base sm:text-lg font-semibold tracking-widest uppercase mt-1" style={{ color: "var(--text-muted)" }}>
                  Lovely Professional University
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-300 text-sm mb-8">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          Powered by Students. Inspired by the Universe.
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6" style={{ color: "var(--text)" }}>
          Touch the Skies with{" "}
          <span className="gradient-text">Talent & Training</span>
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          A student-driven space innovation hub at LPU. Learn rocket science, build satellites, publish research, and compete globally — right from campus.
        </p>

        {/* University affiliation note */}
        <p className="text-xs mb-10 font-medium" style={{ color: "var(--text-faint)" }}>
          🏛️ Lovely Professional University · Centre for Space Science · Phagwara, Punjab 144411
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/join" className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all glow-blue text-sm">
            Join the Club <ArrowRight size={16} />
          </Link>
          <Link href="/programs" className="flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 font-medium rounded-xl transition-all text-sm" style={{ color: "var(--text)" }}>
            <Play size={16} className="text-blue-400" /> Explore Programs
          </Link>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-xs" style={{ color: "var(--text-muted)" }}>
              <Icon size={12} className="text-blue-400" /> {label}
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />
    </section>
  );
}
