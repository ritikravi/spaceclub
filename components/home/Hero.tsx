import Link from "next/link";
import { ArrowRight, Satellite, Telescope, Cpu, Trophy } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-20 bg-white">
      {/* Thin top announcement bar */}
      <div className="bg-blue-700 text-white text-xs text-center py-2 px-4">
        🚀 Semester 2 applications are open — <Link href="/join" className="underline font-semibold">Apply now</Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              LPU Space Club — Official Student Club
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
              Touch the Skies with{" "}
              <span className="gradient-text">Talent & Training</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              LPU's student-driven space innovation hub. Build satellites, do research, compete in ISRO hackathons — right from campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/join" className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all shadow-md glow-blue text-sm">
                Join the Club <ArrowRight size={15} />
              </Link>
              <Link href="/programs" className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all text-sm">
                Explore Programs
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Satellite, label: "Satellite Projects" },
                { icon: Telescope, label: "Astronomy Nights" },
                { icon: Cpu, label: "Embedded Systems" },
                { icon: Trophy, label: "ISRO Hackathons" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-xs">
                  <Icon size={12} className="text-blue-600" /> {label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-8 text-white shadow-xl">
              <div className="text-5xl mb-4 text-center">🚀</div>
              <h3 className="text-xl font-bold text-center mb-5">Space Innovation Hub</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { emoji: "🛰️", label: "CubeSat Missions" },
                  { emoji: "🔭", label: "Astronomy Nights" },
                  { emoji: "🤖", label: "Rover Projects" },
                  { emoji: "🧠", label: "AI for Space" },
                  { emoji: "📄", label: "Research Papers" },
                  { emoji: "🏆", label: "ISRO Hackathons" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
                    <span className="text-base">{item.emoji}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-3 -right-3 bg-white border border-gray-200 rounded-xl shadow-md px-3 py-1.5 text-xs font-semibold text-gray-700">
              🌟 Top Student Club
            </div>
            <div className="absolute -bottom-3 -left-3 bg-white border border-gray-200 rounded-xl shadow-md px-3 py-1.5 text-xs font-semibold text-gray-600">
              📍 LPU, Phagwara
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
