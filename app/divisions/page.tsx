import SectionHeading from "@/components/SectionHeading";
import StarField from "@/components/StarField";
import Link from "next/link";

const divisions = [
  {
    emoji: "🚀",
    name: "Aerospace Division",
    tagline: "Build what flies",
    color: "border-orange-400/30",
    glow: "bg-orange-400/5",
    badge: "text-orange-400 bg-orange-400/10",
    skills: ["CubeSat Design", "CanSat Missions", "Rocketry", "Orbital Mechanics", "Mission Planning", "Payload Design"],
    description: "Design, build, and launch real aerospace systems. From CanSat competitions to CubeSat missions, this is where hardware meets space.",
    projects: ["CanSat 2024 — Atmospheric Analysis", "Ground Station Antenna Tracker", "Orbital Simulation Tool"],
  },
  {
    emoji: "🤖",
    name: "Robotics Division",
    tagline: "Automate everything",
    color: "border-blue-400/30",
    glow: "bg-blue-400/5",
    badge: "text-blue-400 bg-blue-400/10",
    skills: ["Rover Design", "Autonomous Navigation", "Drone Mapping", "ROS", "Computer Vision", "Mechanical Design"],
    description: "Build rovers, autonomous drones, and ground-based robots that solve real-world and space-inspired problems.",
    projects: ["Mars Rover Prototype", "Autonomous Quadcopter", "Line-Following Robot"],
  },
  {
    emoji: "🧠",
    name: "AI & Data Division",
    tagline: "Intelligence for space",
    color: "border-purple-400/30",
    glow: "bg-purple-400/5",
    badge: "text-purple-400 bg-purple-400/10",
    skills: ["Machine Learning", "Computer Vision", "GIS & Remote Sensing", "Python", "MATLAB", "Data Analysis"],
    description: "Apply AI, machine learning, and remote sensing to satellite imagery, climate analysis, and space data challenges.",
    projects: ["Crop Health Monitor via Satellite", "Flood Detection using SAR", "Space Debris Classifier"],
  },
  {
    emoji: "⚡",
    name: "Embedded Systems Division",
    tagline: "Build the brain",
    color: "border-green-400/30",
    glow: "bg-green-400/5",
    badge: "text-green-400 bg-green-400/10",
    skills: ["Arduino", "ESP32", "STM32", "PCB Design", "Sensor Integration", "RTOS"],
    description: "Design the electronics and firmware that power satellites, rovers, weather stations, and ground systems.",
    projects: ["Pico Satellite Power System", "IoT Weather Station", "Custom PCB for CanSat"],
  },
  {
    emoji: "💻",
    name: "Software Division",
    tagline: "Code the mission",
    color: "border-cyan-400/30",
    glow: "bg-cyan-400/5",
    badge: "text-cyan-400 bg-cyan-400/10",
    skills: ["React / Next.js", "Node.js", "Python", "APIs", "Cloud", "Database Design"],
    description: "Build the tools, dashboards, apps, and platforms that support every other division and the club's operations.",
    projects: ["Club Management Portal", "Satellite Tracking Dashboard", "Mission Control Simulator"],
  },
  {
    emoji: "📄",
    name: "Research Division",
    tagline: "Discover and publish",
    color: "border-pink-400/30",
    glow: "bg-pink-400/5",
    badge: "text-pink-400 bg-pink-400/10",
    skills: ["Research Paper Writing", "Literature Review", "Patent Filing", "LaTeX", "Data Analysis", "Prototyping"],
    description: "Read, write, and publish research papers. Get guidance on patents, prototypes, and academic collaborations with IITs and NIT.",
    projects: ["Space Debris Avoidance (IEEE Paper)", "Solar Panel Optimization Research", "ISRO Student Grant Project"],
  },
  {
    emoji: "🔭",
    name: "Astronomy Division",
    tagline: "Observe the cosmos",
    color: "border-yellow-400/30",
    glow: "bg-yellow-400/5",
    badge: "text-yellow-400 bg-yellow-400/10",
    skills: ["Telescope Operation", "Astrophotography", "Celestial Navigation", "Star Mapping", "Spectroscopy", "Planet Observation"],
    description: "Observe planets, photograph nebulae, track meteor showers, and host public skywatching events for the campus.",
    projects: ["Milky Way Panorama Series", "Jupiter Opposition Imaging", "Solar Eclipse Coverage"],
  },
  {
    emoji: "🎨",
    name: "Media & Design Division",
    tagline: "Tell the story",
    color: "border-rose-400/30",
    glow: "bg-rose-400/5",
    badge: "text-rose-400 bg-rose-400/10",
    skills: ["CAD / SolidWorks", "3D Printing", "Graphic Design", "Video Production", "Social Media", "Technical Writing"],
    description: "Document, design, and promote everything the club does — from CAD models to social media campaigns.",
    projects: ["Club Annual Report Design", "Satellite 3D Model Series", "Space Club Documentary"],
  },
];

export default function DivisionsPage() {
  return (
    <div className="min-h-screen bg-[#050a14] pt-24">
      <section className="relative py-20 overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">
            Divisions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Find Your <span className="gradient-text">Specialty</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Eight specialized teams. Each one builds, researches, and creates real things. Join one or cross into multiple.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-24">
        {divisions.map((d) => (
          <div key={d.name} className={`glass rounded-2xl p-8 border ${d.color} ${d.glow}`}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left */}
              <div className="lg:w-1/3">
                <div className="text-5xl mb-4">{d.emoji}</div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${d.badge}`}>
                  {d.tagline}
                </span>
                <h2 className="text-2xl font-bold text-white mt-3 mb-3">{d.name}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{d.description}</p>
              </div>
              {/* Middle — skills */}
              <div className="lg:w-1/3">
                <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">Skills You'll Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {d.skills.map((s) => (
                    <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {/* Right — projects */}
              <div className="lg:w-1/3">
                <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">Current Projects</h3>
                <ul className="space-y-2">
                  {d.projects.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="text-blue-400 mt-0.5">→</span> {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/join"
                  className="mt-5 inline-block px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/30 text-blue-300 text-xs font-medium rounded-lg transition-all"
                >
                  Join this division →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
