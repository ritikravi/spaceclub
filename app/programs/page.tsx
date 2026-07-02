import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Calendar, Trophy, BookOpen, Building2, Monitor, Rocket, GraduationCap, Lightbulb } from "lucide-react";

const programs = [
  { icon: Rocket, title: "Space Camps", badge: "Residential", badgeColor: "text-green-600 bg-green-100", color: "text-green-600", bg: "bg-green-50", description: "Multi-day intensive residential camps organized under the supervision of eminent space researchers and professionals.", highlights: ["Hands-on satellite building", "Rocketry experiments", "Live mentoring sessions", "Team projects", "Industry visits"], frequency: "Once per semester" },
  { icon: Calendar, title: "Sky Safari", badge: "Outdoor", badgeColor: "text-purple-600 bg-purple-100", color: "text-purple-600", bg: "bg-purple-50", description: "Students get opportunities to sky watch and learn in the presence of professionals on special astronomical occasions.", highlights: ["Planet observation", "Telescope training", "Meteor shower events", "Eclipse coverage", "Astrophotography sessions"], frequency: "Monthly events" },
  { icon: Trophy, title: "Hackathon Prep", badge: "Competitive", badgeColor: "text-yellow-600 bg-yellow-100", color: "text-yellow-600", bg: "bg-yellow-50", description: "Structured preparation for national and international space hackathons. Team formation, mock reviews, and coaching included.", highlights: ["ISRO Hackathon", "NASA Space Apps", "Smart India Hackathon", "CanSat Competitions", "IN-SPACe Challenges"], frequency: "Before major competitions" },
  { icon: BookOpen, title: "Research Cell", badge: "Research", badgeColor: "text-pink-600 bg-pink-100", color: "text-pink-600", bg: "bg-pink-50", description: "Guided program for students interested in academic research. Learn to read, write, and publish papers with IIT mentors.", highlights: ["Paper reading clubs", "Publication guidance", "Patent filing support", "Prototype development", "IIT collaborations"], frequency: "Ongoing" },
  { icon: Building2, title: "Industry Visits", badge: "Exposure", badgeColor: "text-blue-600 bg-blue-100", color: "text-blue-600", bg: "bg-blue-50", description: "Supervised visits to ISRO, IN-SPACe, space startups, and research labs. Special occasion participation included.", highlights: ["ISRO Thiruvananthapuram", "IN-SPACe facilities", "Space startup offices", "Research lab tours", "Expert interaction"], frequency: "2–3 times per year" },
  { icon: Monitor, title: "Weekly Webinars", badge: "Online", badgeColor: "text-cyan-600 bg-cyan-100", color: "text-cyan-600", bg: "bg-cyan-50", description: "Weekly online sessions with national and international professionals nurturing passion for space sciences.", highlights: ["ISRO scientists", "International researchers", "Space startup founders", "IIT professors", "NASA collaborators"], frequency: "Every week" },
  { icon: GraduationCap, title: "Classroom Learning", badge: "Academic", badgeColor: "text-orange-600 bg-orange-100", color: "text-orange-600", bg: "bg-orange-50", description: "Structured lectures by experts from premier institutions. Live interactions with veterans in space science.", highlights: ["Orbital mechanics basics", "Satellite design fundamentals", "Space law & policy", "Embedded for space", "Python for space data"], frequency: "Bi-weekly" },
  { icon: Lightbulb, title: "Space Startup Cell", badge: "Innovation", badgeColor: "text-rose-600 bg-rose-100", color: "text-rose-600", bg: "bg-rose-50", description: "For students with entrepreneurial ambitions — validate ideas, build pitch decks, understand the space economy.", highlights: ["Startup ideation", "Pitch deck building", "Space market analysis", "Funding guidance", "Mentor network"], frequency: "Monthly sessions" },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-200 bg-white/20 rounded-full mb-4">Programs</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Programs Built for Real Growth</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Every program is designed to give students real experience — not just theory.</p>
        </div>
      </section>

      <section id="competitions" className="py-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div key={p.title} className="glass glass-hover rounded-2xl p-7">
              <div className="flex items-start justify-between mb-5">
                <div className={`w-12 h-12 ${p.bg} rounded-xl flex items-center justify-center`}>
                  <p.icon size={22} className={p.color} />
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${p.badgeColor}`}>{p.badge}</span>
              </div>
              <h2 className="text-gray-900 font-bold text-xl mb-2">{p.title}</h2>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">{p.description}</p>
              <div className="mb-5">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Highlights</div>
                <ul className="space-y-1">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="text-orange-500 text-xs">✓</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-400">🕐 {p.frequency}</span>
                <Link href="/join" className="text-orange-500 hover:text-orange-600 text-xs font-semibold transition-colors">
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
