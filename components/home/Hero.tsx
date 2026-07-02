"use client";
import Link from "next/link";
import StarField from "@/components/StarField";
import { ArrowRight, Play, Satellite, Telescope, Cpu } from "lucide-react";

const badges = [
  { icon: Satellite, label: "Satellite Projects" },
  { icon: Telescope, label: "Astronomy Nights" },
  { icon: Cpu, label: "Embedded Systems" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a14]">
      <StarField />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-300 text-sm mb-8">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          Powered by Students. Inspired by the Universe.
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          Touch the Skies with{" "}
          <span className="gradient-text">Talent & Training</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          A student-driven space innovation hub. Learn rocket science, build satellites, publish research, and compete globally — right from your college.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/join"
            className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all glow-blue text-sm"
          >
            Join the Club <ArrowRight size={16} />
          </Link>
          <Link
            href="/programs"
            className="flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium rounded-xl transition-all text-sm"
          >
            <Play size={16} className="text-blue-400" /> Explore Programs
          </Link>
        </div>

        {/* Mini badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-300 text-xs"
            >
              <Icon size={14} className="text-blue-400" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a14] to-transparent pointer-events-none" />
    </section>
  );
}
