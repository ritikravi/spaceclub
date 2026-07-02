import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Calendar, Users, Trophy, BookOpen, Building2, Monitor } from "lucide-react";

const programs = [
  { icon: Calendar, title: "Space Camps", desc: "Intensive residential camps with researchers and engineers.", badge: "Residential", badgeColor: "text-green-700 bg-green-50 border border-green-200" },
  { icon: Users, title: "Hackathon Prep", desc: "Team formation, coaching for ISRO, NASA Space Apps, SIH.", badge: "Competitive", badgeColor: "text-yellow-700 bg-yellow-50 border border-yellow-200" },
  { icon: BookOpen, title: "Research Cell", desc: "Guided paper reading, writing, publishing, and patent filing.", badge: "Research", badgeColor: "text-pink-700 bg-pink-50 border border-pink-200" },
  { icon: Trophy, title: "Competitions", desc: "ISRO Hackathon, CanSat, CubeSat challenges, SIH, and more.", badge: "National", badgeColor: "text-blue-700 bg-blue-50 border border-blue-200" },
  { icon: Building2, title: "Industry Visits", desc: "Supervised visits to ISRO, IN-SPACe, and space startups.", badge: "Exposure", badgeColor: "text-indigo-700 bg-indigo-50 border border-indigo-200" },
  { icon: Monitor, title: "Weekly Webinars", desc: "National & international professionals every week.", badge: "Online", badgeColor: "text-purple-700 bg-purple-50 border border-purple-200" },
];

export default function ProgramsPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Programs" title="Programs Built for Real Growth" subtitle="Not just lectures — actual experiences that shape your career." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {programs.map((p) => (
            <div key={p.title} className="glass glass-hover rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <p.icon size={18} className="text-blue-700" />
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.badgeColor}`}>{p.badge}</span>
              </div>
              <h3 className="text-gray-900 font-semibold text-base mb-1.5">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/programs" className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-semibold text-sm transition-colors">
            Explore all programs <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
