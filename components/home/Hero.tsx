import Link from "next/link";
import { ArrowRight, Satellite, Telescope, Cpu, Trophy } from "lucide-react";

const badges = [
  { icon: Satellite, label: "Satellite Projects" },
  { icon: Telescope, label: "Astronomy Nights" },
  { icon: Cpu, label: "Embedded Systems" },
  { icon: Trophy, label: "ISRO Hackathons" },
];

export default function Hero() {
  return (
    <section className="pt-24 pb-0 bg-white">
      {/* Orange top banner like LPU */}
      <div className="bg-orange-500 text-white text-xs text-center py-2 px-4 font-medium">
        🚀 Applications open for Semester 2 — Join Space Club today and be part of India's next space generation
      </div>

      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 border border-orange-200 rounded-full text-orange-600 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              LPU Space Club — Official Student Club
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Touch the Skies with{" "}
              <span className="gradient-text">Talent & Training</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              LPU's student-driven space innovation hub. Learn rocket science, build satellites, publish research, and compete globally — right from campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/join"
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all shadow-md glow-blue text-sm"
              >
                Join the Club <ArrowRight size={16} />
              </Link>
              <Link
                href="/programs"
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all text-sm"
              >
                Explore Programs
              </Link>
            </div>
            {/* Mini badges */}
            <div className="flex flex-wrap gap-2">
              {badges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-xs font-medium">
                  <Icon size={13} className="text-orange-500" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-6xl mb-4 text-center">🚀</div>
              <h3 className="text-2xl font-bold text-center mb-6">Space Innovation Hub</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: "🛰️", label: "CubeSat Missions" },
                  { emoji: "🔭", label: "Astronomy Nights" },
                  { emoji: "🤖", label: "Rover Projects" },
                  { emoji: "🧠", label: "AI for Space" },
                  { emoji: "📄", label: "Research Papers" },
                  { emoji: "🏆", label: "ISRO Hackathons" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/15 rounded-xl px-3 py-2.5 flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white border border-orange-200 rounded-xl shadow-lg px-3 py-2 text-xs font-semibold text-orange-600">
              🌟 Top Student Club
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border border-gray-200 rounded-xl shadow-lg px-3 py-2 text-xs font-semibold text-gray-700">
              📍 LPU Campus
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
