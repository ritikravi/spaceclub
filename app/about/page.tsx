import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Rocket, Trophy, BookOpen, Users, Building2, Link2, GitBranch } from "lucide-react";

const faculty = [
  {
    name: "Dr. Jaisukh Paul",
    role: "Faculty Head",
    dept: "Space Sciences, LPU",
    avatar: "JP",
    color: "bg-blue-600",
    photo: "",
    linkedin: "",
    github: "",
    bio: "Leading the academic vision of the Space Club, guiding students in research, satellite missions, and space technology innovation.",
  },
  {
    name: "Rohan Kumar",
    role: "Faculty Coordinator",
    dept: "Aerospace Engineering, LPU",
    avatar: "RK",
    color: "bg-indigo-600",
    photo: "",
    linkedin: "",
    github: "",
    bio: "Coordinating club activities, mentoring project teams, and building industry connections for students pursuing space careers.",
  },
];

const studentLeads = [
  {
    name: "Ayush Pratap Singh",
    role: "Student Lead",
    dept: "B.Tech, LPU",
    avatar: "AS",
    color: "bg-purple-600",
    photo: "",
    linkedin: "",
    github: "",
    bio: "Driving the technical and operational vision of the club, leading hackathon teams and satellite project initiatives.",
  },
  {
    name: "Ritik Raushan",
    role: "Student Lead",
    dept: "B.Tech CSE, LPU",
    avatar: "RR",
    color: "bg-cyan-600",
    photo: "",
    linkedin: "",
    github: "",
    bio: "Heading the Software & Innovation division, building the club's digital infrastructure and outreach platforms.",
  },
];

const achievements = [
  { icon: Trophy, value: "Top 40", label: "NASA Space Apps — Global Shortlist", color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-400/10" },
  { icon: BookOpen, value: "12", label: "Research Papers Published", color: "text-pink-600 bg-pink-50 dark:bg-pink-400/10" },
  { icon: Rocket, value: "3", label: "CanSat Missions Completed", color: "text-orange-600 bg-orange-50 dark:bg-orange-400/10" },
  { icon: Users, value: "500+", label: "Active Student Members", color: "text-blue-600 bg-blue-50 dark:bg-blue-400/10" },
  { icon: Building2, value: "5+", label: "ISRO Visits Organised", color: "text-green-600 bg-green-50 dark:bg-green-400/10" },
  { icon: Trophy, value: "SIH 2023", label: "Smart India Hackathon Winners", color: "text-purple-600 bg-purple-50 dark:bg-purple-400/10" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 section-bg">
      {/* Hero */}
      <section className="py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6" style={{ color: "var(--text)" }}>
            LPU's Space <span className="gradient-text">Innovation Hub</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Not just a club — a full ecosystem where students learn, build, compete, research, and innovate in everything space and aerospace.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-8 border-l-4 border-blue-500">
            <div className="w-12 h-12 bg-blue-400/10 rounded-xl flex items-center justify-center mb-5">
              <Target size={22} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>Mission</h2>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
              To cultivate a strong ecosystem of space technology, astronomy, satellite engineering, robotics, AI, and aerospace innovation among LPU students.
            </p>
          </div>
          <div className="glass rounded-2xl p-8 border-l-4 border-purple-500">
            <div className="w-12 h-12 bg-purple-400/10 rounded-xl flex items-center justify-center mb-5">
              <Eye size={22} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>Vision</h2>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
              To build India's most active student-led space innovation community — a launchpad for students aiming for ISRO, IN-SPACe, IITs, and private space companies.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-16 section-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading tag="Faculty" title="Guided By" subtitle="The faculty heads who shape the vision and direction of Space Club LPU." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {faculty.map((f) => (
              <div key={f.name} className="glass glass-hover rounded-2xl p-7 text-center">
                <div className="mx-auto mb-4">
                  {f.photo ? (
                    <img src={f.photo} alt={f.name} className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-blue-400/30 shadow-lg" />
                  ) : (
                    <div className={`w-20 h-20 ${f.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-lg`}>{f.avatar}</div>
                  )}
                </div>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">{f.role}</div>
                <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>{f.name}</h3>
                <div className="text-xs mb-3" style={{ color: "var(--text-faint)" }}>{f.dept}</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{f.bio}</p>
                <div className="flex justify-center gap-3">
                  {f.linkedin && <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"><Link2 size={12}/>LinkedIn</a>}
                  {f.github && <a href={f.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"><GitBranch size={12}/>GitHub</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Leads */}
      <section className="py-16 section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading tag="Student Leadership" title="Led By" subtitle="The student leaders driving every initiative, project, and event." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {studentLeads.map((s) => (
              <div key={s.name} className="glass glass-hover rounded-2xl p-7 text-center">
                <div className="mx-auto mb-4">
                  {s.photo ? (
                    <img src={s.photo} alt={s.name} className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-purple-400/30 shadow-lg" />
                  ) : (
                    <div className={`w-20 h-20 ${s.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-lg`}>{s.avatar}</div>
                  )}
                </div>
                <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">{s.role}</div>
                <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>{s.name}</h3>
                <div className="text-xs mb-3" style={{ color: "var(--text-faint)" }}>{s.dept}</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{s.bio}</p>
                <div className="flex justify-center gap-3">
                  {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"><Link2 size={12}/>LinkedIn</a>}
                  {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"><GitBranch size={12}/>GitHub</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="py-16 section-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading tag="Achievements" title="What We've Done" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a) => (
              <div key={a.label} className="glass glass-hover rounded-2xl p-6 flex items-center gap-5">
                <div className={`w-12 h-12 ${a.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <a.icon size={22} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold" style={{ color: "var(--text)" }}>{a.value}</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>{a.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
