import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

const divisions = [
  {
    emoji: "🚀", name: "Aerospace Division", tagline: "Build what flies",
    border: "border-orange-200", badge: "text-orange-600 bg-orange-100",
    skills: ["CubeSat Design", "CanSat Missions", "Rocketry", "Orbital Mechanics", "Mission Planning", "Payload Design"],
    description: "Design, build, and launch real aerospace systems. From CanSat competitions to CubeSat missions, this is where hardware meets space.",
    projects: ["CanSat 2024 — Atmospheric Analysis", "Ground Station Antenna Tracker", "Orbital Simulation Tool"],
  },
  {
    emoji: "🤖", name: "Robotics Division", tagline: "Automate everything",
    border: "border-blue-200", badge: "text-blue-600 bg-blue-100",
    skills: ["Rover Design", "Autonomous Navigation", "Drone Mapping", "ROS", "Computer Vision", "Mechanical Design"],
    description: "Build rovers, autonomous drones, and ground-based robots that solve real-world and space-inspired problems.",
    projects: ["Mars Rover Prototype", "Autonomous Quadcopter", "Line-Following Robot"],
  },
  {
    emoji: "🧠", name: "AI & Data Division", tagline: "Intelligence for space",
    border: "border-purple-200", badge: "text-purple-600 bg-purple-100",
    skills: ["Machine Learning", "Computer Vision", "GIS & Remote Sensing", "Python", "MATLAB", "Data Analysis"],
    description: "Apply AI, ML, and remote sensing to satellite imagery, climate analysis, and space data challenges.",
    projects: ["Crop Health Monitor via Satellite", "Flood Detection using SAR", "Space Debris Classifier"],
  },
  {
    emoji: "⚡", name: "Embedded Systems Division", tagline: "Build the brain",
    border: "border-green-200", badge: "text-green-600 bg-green-100",
    skills: ["Arduino", "ESP32", "STM32", "PCB Design", "Sensor Integration", "RTOS"],
    description: "Design the electronics and firmware that power satellites, rovers, weather stations, and ground systems.",
    projects: ["Pico Satellite Power System", "IoT Weather Station", "Custom PCB for CanSat"],
  },
  {
    emoji: "💻", name: "Software Division", tagline: "Code the mission",
    border: "border-cyan-200", badge: "text-cyan-600 bg-cyan-100",
    skills: ["React / Next.js", "Node.js", "Python", "APIs", "Cloud", "Database Design"],
    description: "Build the tools, dashboards, apps, and platforms that support every other division and the club's operations.",
    projects: ["Club Management Portal", "Satellite Tracking Dashboard", "Mission Control Simulator"],
  },
  {
    emoji: "📄", name: "Research Division", tagline: "Discover and publish",
    border: "border-pink-200", badge: "text-pink-600 bg-pink-100",
    skills: ["Research Paper Writing", "Literature Review", "Patent Filing", "LaTeX", "Data Analysis", "Prototyping"],
    description: "Read, write, and publish research papers. Get guidance on patents, prototypes, and academic collaborations.",
    projects: ["Space Debris Avoidance (IEEE Paper)", "Solar Panel Optimization Research", "ISRO Student Grant Project"],
  },
  {
    emoji: "🔭", name: "Astronomy Division", tagline: "Observe the cosmos",
    border: "border-yellow-200", badge: "text-yellow-600 bg-yellow-100",
    skills: ["Telescope Operation", "Astrophotography", "Celestial Navigation", "Star Mapping", "Spectroscopy", "Planet Observation"],
    description: "Observe planets, photograph nebulae, track meteor showers, and host public skywatching events on campus.",
    projects: ["Milky Way Panorama Series", "Jupiter Opposition Imaging", "Solar Eclipse Coverage"],
  },
  {
    emoji: "🎨", name: "Media & Design Division", tagline: "Tell the story",
    border: "border-rose-200", badge: "text-rose-600 bg-rose-100",
    skills: ["CAD / SolidWorks", "3D Printing", "Graphic Design", "Video Production", "Social Media", "Technical Writing"],
    description: "Document, design, and promote everything the club does — from CAD models to social media campaigns.",
    projects: ["Club Annual Report Design", "Satellite 3D Model Series", "Space Club Documentary"],
  },
];

export default function DivisionsPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-200 bg-white/20 rounded-full mb-4">Divisions</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Find Your Specialty</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Eight specialized teams. Each one builds, researches, and creates real things.</p>
        </div>
      </section>

      <section className="py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {divisions.map((d) => (
          <div key={d.name} className={`glass rounded-2xl p-8 border-l-4 ${d.border}`}>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="text-5xl mb-4">{d.emoji}</div>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${d.badge}`}>{d.tagline}</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-3">{d.name}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{d.description}</p>
              </div>
              <div className="lg:w-1/3">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Skills You'll Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {d.skills.map((s) => (
                    <span key={s} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/3">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Current Projects</h3>
                <ul className="space-y-2">
                  {d.projects.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-orange-500 mt-0.5">→</span> {p}
                    </li>
                  ))}
                </ul>
                <Link href="/join" className="mt-5 inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-all">
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
