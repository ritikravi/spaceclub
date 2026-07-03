"use client";
import Link from "next/link";
import StarField from "@/components/StarField";
import { ArrowRight, Play, Satellite, Telescope, Cpu, Users, Award, MapPin } from "lucide-react";

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
    <section className="relative min-h-screen flex items-center overflow-hidden section-bg">
      <StarField />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left — main content */}
          <div className="flex-1">
            {/* LPU branding */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">🚀</div>
              <div>
                <div className="text-3xl sm:text-4xl font-black" style={{ color: "var(--text)" }}>
                  LPU <span className="text-blue-400">Space Club</span>
                </div>
                <div className="text-sm font-semibold uppercase tracking-widest mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Lovely Professional University
                </div>
              </div>
            </div>

            {/* Pulse badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-300 text-sm mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Powered by Students. Inspired by the Universe.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5" style={{ color: "var(--text)" }}>
              Touch the Skies with{" "}
              <span className="gradient-text">Talent & Training</span>
            </h1>

            <p className="text-lg leading-relaxed mb-3 max-w-xl" style={{ color: "var(--text-muted)" }}>
              A student-driven space innovation hub at LPU. Learn rocket science, build satellites, publish research, and compete globally — right from campus.
            </p>

            <p className="text-sm font-semibold mb-8" style={{ color: "var(--text-muted)" }}>
              🏛️ Lovely Professional University · Centre for Space Science
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/join" className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all glow-blue text-sm">
                Join the Club <ArrowRight size={16} />
              </Link>
              <Link href="/programs" className="flex items-center gap-2 px-7 py-3.5 border font-medium rounded-xl transition-all text-sm" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                <Play size={16} className="text-blue-400" /> Explore Programs
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {badges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-xs" style={{ color: "var(--text-muted)" }}>
                  <Icon size={11} className="text-blue-400" /> {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual card */}
          <div className="lg:w-[420px] shrink-0 w-full">
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-5xl mb-4 text-center">🌌</div>
              <h3 className="text-xl font-bold text-center mb-6">Space Innovation Hub</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { emoji: "🛰️", label: "CubeSat Missions" },
                  { emoji: "🔭", label: "Astronomy Nights" },
                  { emoji: "🤖", label: "Rover Projects" },
                  { emoji: "🧠", label: "AI for Space" },
                  { emoji: "📄", label: "Research Papers" },
                  { emoji: "🏆", label: "ISRO Hackathons" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 hover:bg-white/20 transition-all rounded-xl px-3 py-2.5 flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-center">
                {[["500+","Members"],["40+","Events"],["10+","Papers"]].map(([v,l]) => (
                  <div key={l}>
                    <div className="text-xl font-extrabold">{v}</div>
                    <div className="text-xs text-blue-200">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />
    </section>
  );
}
