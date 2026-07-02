import SectionHeading from "@/components/SectionHeading";
import StarField from "@/components/StarField";
import Link from "next/link";
import { Calendar, Trophy, BookOpen, Building2, Monitor, Rocket, GraduationCap, Lightbulb } from "lucide-react";

const programs = [
  {
    icon: Rocket,
    title: "Space Camps",
    badge: "Residential",
    badgeColor: "text-green-400 bg-green-400/10",
    color: "text-green-400",
    bg: "bg-green-400/10",
    description: "Multi-day intensive residential camps organized under the supervision of eminent space researchers and professionals at different destinations.",
    highlights: ["Hands-on satellite building", "Rocketry experiments", "Live mentoring sessions", "Team projects", "Industry visits"],
    frequency: "Once per semester",
  },
  {
    icon: Calendar,
    title: "Sky Safari",
    badge: "Outdoor",
    badgeColor: "text-purple-400 bg-purple-400/10",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    description: "Students are given opportunities to sky watch and learn in the presence of professionals on special astronomical occasions.",
    highlights: ["Planet observation", "Telescope training", "Meteor shower events", "Eclipse coverage", "Astrophotography sessions"],
    frequency: "Monthly events",
  },
  {
    icon: Trophy,
    title: "Hackathon Prep",
    badge: "Competitive",
    badgeColor: "text-yellow-400 bg-yellow-400/10",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    description: "Structured preparation program for national and international space hackathons. Team formation, mock reviews, and coaching included.",
    highlights: ["ISRO Hackathon", "NASA Space Apps", "Smart India Hackathon", "CanSat Competitions", "IN-SPACe Challenges"],
    frequency: "Before major competitions",
  },
  {
    icon: BookOpen,
    title: "Research Cell",
    badge: "Research",
    badgeColor: "text-pink-400 bg-pink-400/10",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    description: "Guided program for students interested in academic research. Learn to read, write, and publish papers with mentors from IITs and research labs.",
    highlights: ["Paper reading clubs", "Publication guidance", "Patent filing support", "Prototype development", "IIT collaborations"],
    frequency: "Ongoing",
  },
  {
    icon: Building2,
    title: "Industry Visits",
    badge: "Exposure",
    badgeColor: "text-blue-400 bg-blue-400/10",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    description: "Supervised visits to ISRO, IN-SPACe, space startups, and research labs. At special occasions, students participate in events.",
    highlights: ["ISRO Thiruvananthapuram", "IN-SPACe facilities", "Space startup offices", "Research lab tours", "Expert interaction"],
    frequency: "2–3 times per year",
  },
  {
    icon: Monitor,
    title: "Weekly Webinars",
    badge: "Online",
    badgeColor: "text-cyan-400 bg-cyan-400/10",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    description: "Weekly online sessions with national and international professionals that nurture passion for space sciences and influence career decisions.",
    highlights: ["ISRO scientists", "International researchers", "Space startup founders", "IIT professors", "NASA collaborators"],
    frequency: "Every week",
  },
  {
    icon: GraduationCap,
    title: "Classroom Learning",
    badge: "Academic",
    badgeColor: "text-orange-400 bg-orange-400/10",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    description: "Structured lectures by experts from premier institutions. Live interactions with veterans in the field of space science and technology.",
    highlights: ["Orbital mechanics basics", "Satellite design fundamentals", "Space law & policy", "Embedded for space", "Python for space data"],
    frequency: "Bi-weekly",
  },
  {
    icon: Lightbulb,
    title: "Space Startup Cell",
    badge: "Innovation",
    badgeColor: "text-rose-400 bg-rose-400/10",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    description: "For students with entrepreneurial ambitions — validate ideas, build pitch decks, understand space economy, and connect with investors.",
    highlights: ["Startup ideation", "Pitch deck building", "Space market analysis", "Funding guidance", "Mentor network"],
    frequency: "Monthly sessions",
  },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#050a14] pt-24">
      <section className="relative py-20 overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">
            Programs
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Programs Built for <span className="gradient-text">Real Growth</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every program is designed to give students real experience — not just theory.
          </p>
        </div>
      </section>

      <section id="competitions" className="py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div key={p.title} className="glass glass-hover rounded-2xl p-7">
              <div className="flex items-start justify-between mb-5">
                <div className={`w-12 h-12 ${p.bg} rounded-xl flex items-center justify-center`}>
                  <p.icon size={22} className={p.color} />
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${p.badgeColor}`}>
                  {p.badge}
                </span>
              </div>
              <h2 className="text-white font-bold text-xl mb-2">{p.title}</h2>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">{p.description}</p>
              <div className="mb-5">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Highlights</div>
                <ul className="space-y-1">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-slate-300 text-sm">
                      <span className="text-blue-400 text-xs">✓</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">🕐 {p.frequency}</span>
                <Link
                  href="/join"
                  className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
                >
                  Register interest →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
