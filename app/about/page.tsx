import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Rocket, Trophy, BookOpen, Users, Building2 } from "lucide-react";

const team = [
  { name: "Dr. Rajesh Kumar", role: "Faculty Coordinator", dept: "Aerospace Dept., LPU" },
  { name: "Aditya Sharma", role: "President", dept: "4th Year, CSE" },
  { name: "Meera Pillai", role: "Vice President", dept: "3rd Year, ECE" },
  { name: "Kiran Das", role: "Technical Lead", dept: "3rd Year, Mech" },
  { name: "Ananya Menon", role: "Research Lead", dept: "3rd Year, Physics" },
  { name: "Rohan Thomas", role: "Events Lead", dept: "2nd Year, CSE" },
  { name: "Lakshmi Nair", role: "Media Lead", dept: "2nd Year, Design" },
  { name: "Dev Krishnan", role: "Outreach Lead", dept: "2nd Year, CS" },
];

const achievements = [
  { icon: Trophy, value: "Top 40", label: "NASA Space Apps — Global Shortlist", color: "text-yellow-600 bg-yellow-50" },
  { icon: BookOpen, value: "12", label: "Research Papers Published", color: "text-pink-600 bg-pink-50" },
  { icon: Rocket, value: "3", label: "CanSat Missions Completed", color: "text-blue-700 bg-blue-50" },
  { icon: Users, value: "500+", label: "Active Student Members", color: "text-blue-600 bg-blue-50" },
  { icon: Building2, value: "5+", label: "ISRO Visits Organised", color: "text-green-600 bg-green-50" },
  { icon: Trophy, value: "SIH 2023", label: "Smart India Hackathon Winners", color: "text-purple-600 bg-purple-50" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="bg-blue-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-200 bg-white/10 rounded-full mb-4">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            LPU's Space Innovation Hub
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto">
            Not just a club — a full ecosystem where students learn, build, compete, research, and innovate in everything space and aerospace.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-8 border-l-4 border-blue-400">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
              <Target size={22} className="text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mission</h2>
            <p className="text-gray-500 leading-relaxed">
              To cultivate a strong ecosystem of space technology, astronomy, satellite engineering, robotics, AI, and aerospace innovation among LPU students — giving every student a clear path from curiosity to contribution.
            </p>
          </div>
          <div className="glass rounded-2xl p-8 border-l-4 border-purple-400">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-5">
              <Eye size={22} className="text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vision</h2>
            <p className="text-gray-500 leading-relaxed">
              To build India's most active student-led space innovation community at LPU — a launchpad for students aiming for ISRO, IN-SPACe, IITs, international research labs, and private space companies.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading tag="Achievements" title="What We've Done" subtitle="Numbers that show the impact of the club so far." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a) => (
              <div key={a.label} className="glass glass-hover rounded-2xl p-6 flex items-center gap-5">
                <div className={`w-12 h-12 ${a.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <a.icon size={22} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">{a.value}</div>
                  <div className="text-gray-500 text-sm">{a.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Team" title="The Core Team" subtitle="The people who keep the club running." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div key={m.name} className="glass glass-hover rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                {m.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <div className="text-gray-900 font-semibold">{m.name}</div>
              <div className="text-blue-700 text-sm mt-1">{m.role}</div>
              <div className="text-gray-400 text-xs mt-1">{m.dept}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
