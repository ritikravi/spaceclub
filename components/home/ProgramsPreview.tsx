import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Calendar, Users, Trophy, BookOpen, Building2, Monitor } from "lucide-react";

const programs = [
  { icon: Calendar, title: "Space Camps", desc: "Intensive residential camps with researchers and engineers.", badge: "Residential", badgeColor: "text-green-400 bg-green-400/10" },
  { icon: Users, title: "Hackathon Prep", desc: "Team formation, mentoring, mock presentations for ISRO, NASA Space Apps, SIH.", badge: "Competitive", badgeColor: "text-yellow-400 bg-yellow-400/10" },
  { icon: BookOpen, title: "Research Cell", desc: "Guided paper reading, writing, publishing, and patent filing.", badge: "Research", badgeColor: "text-pink-400 bg-pink-400/10" },
  { icon: Trophy, title: "Competitions", desc: "ISRO Hackathon, CanSat, CubeSat challenges, Smart India Hackathon, and more.", badge: "National", badgeColor: "text-orange-400 bg-orange-400/10" },
  { icon: Building2, title: "Industry Visits", desc: "Supervised visits to ISRO, IN-SPACe, startups, and research labs.", badge: "Exposure", badgeColor: "text-blue-400 bg-blue-400/10" },
  { icon: Monitor, title: "Weekly Webinars", desc: "National and international professionals connect with students every week.", badge: "Online", badgeColor: "text-purple-400 bg-purple-400/10" },
];

export default function ProgramsPreview() {
  return (
    <section className="py-24 section-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Programs" title="Programs Built for Real Growth" subtitle="Not just lectures — actual experiences that shape your career path." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {programs.map((p) => (
            <div key={p.title} className="glass glass-hover rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 bg-blue-400/10 rounded-xl flex items-center justify-center">
                  <p.icon size={20} className="text-blue-400" />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.badgeColor}`}>{p.badge}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/programs" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
            Explore all programs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
