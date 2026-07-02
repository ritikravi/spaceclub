import SectionHeading from "@/components/SectionHeading";
import { GitBranch, ExternalLink } from "lucide-react";

const projects = [
  { title: "CanSat Mission 2024", division: "Aerospace", status: "Completed", statusColor: "text-green-600 bg-green-100", description: "A functional CanSat launched to 1km altitude to collect atmospheric pressure, temperature, and humidity data during descent.", team: ["Aditya S.", "Meera P.", "Kiran D."], mentor: "Dr. Rajesh Kumar", tech: ["C++", "Arduino", "RF Module", "CAD"], highlights: ["Secured top 5 in national CanSat competition", "Published data collection methodology as a paper"] },
  { title: "Satellite Tracking Dashboard", division: "Software", status: "Active", statusColor: "text-blue-600 bg-blue-100", description: "A real-time web dashboard that tracks ISS and LEO satellites using TLE data, with pass prediction and ground track visualization.", team: ["Rohan T.", "Sneha T.", "Dev K."], mentor: "Prof. Anand Nair", tech: ["React", "Node.js", "satellite.js", "Leaflet"], highlights: ["Tracks 50+ satellites in real-time", "Used by college astronomy club"] },
  { title: "Crop Health Monitor", division: "AI & Data", status: "Active", statusColor: "text-blue-600 bg-blue-100", description: "Using Sentinel-2 satellite imagery and NDVI analysis to monitor crop health across Kerala for agricultural insights.", team: ["Priya N.", "Ananya M.", "Lakshmi N."], mentor: "Dr. Sunita Rao", tech: ["Python", "GEE", "QGIS", "TensorFlow"], highlights: ["Coverage of 500+ hectares", "Presented at national GIS conference"] },
  { title: "Mars Rover Prototype", division: "Robotics", status: "Completed", statusColor: "text-green-600 bg-green-100", description: "A 6-wheel rocker-bogie rover prototype capable of autonomous obstacle avoidance and terrain mapping using LiDAR.", team: ["Kiran D.", "Rahul K.", "Aditya S."], mentor: "Prof. Vijay Menon", tech: ["ROS", "Python", "LiDAR", "ESP32", "SolidWorks"], highlights: ["Competed in IRC 2023", "Featured in college tech fest"] },
  { title: "Weather Cube Satellite", division: "Aerospace", status: "In Progress", statusColor: "text-yellow-600 bg-yellow-100", description: "1U CubeSat design to measure upper-atmosphere weather patterns. Working towards launch via ISRO's student satellite program.", team: ["Meera P.", "Priya N.", "Rahul K.", "Kiran D."], mentor: "Dr. Rajesh Kumar", tech: ["MATLAB", "STK", "PCB Design", "RTOS", "Python"], highlights: ["Shortlisted for ISRO's student satellite program", "Collaboration with NIT Calicut"] },
  { title: "Flood Detection via SAR", division: "AI & Data", status: "Completed", statusColor: "text-green-600 bg-green-100", description: "Deep learning model using Sentinel-1 SAR imagery to detect and map flood-affected areas in near real-time.", team: ["Ananya M.", "Sneha T."], mentor: "Dr. Sunita Rao", tech: ["Python", "PyTorch", "SNAP", "GEE", "Streamlit"], highlights: ["Published in IEEE Student Journal", "Used for 2023 Kerala flood response planning"] },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-200 bg-white/20 rounded-full mb-4">Projects</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Real Projects, Real Impact</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Every project here is student-built. Mentored by industry professionals and researchers.</p>
        </div>
      </section>

      <section className="py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div key={p.title} className="glass glass-hover rounded-2xl p-7">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded font-medium">{p.division}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.statusColor}`}>{p.status}</span>
                  </div>
                  <h2 className="text-gray-900 font-bold text-xl">{p.title}</h2>
                </div>
                <div className="flex gap-2">
                  <button aria-label="GitHub" className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 transition-all">
                    <GitBranch size={14} />
                  </button>
                  <button aria-label="External link" className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 transition-all">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-600 text-xs rounded font-medium">{t}</span>
                ))}
              </div>
              <div className="space-y-1 mb-4">
                {p.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-gray-600 text-xs">
                    <span className="text-yellow-500">★</span> {h}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="text-xs text-gray-400">Team: {p.team.join(", ")}</div>
                <div className="text-xs text-gray-400">Mentor: {p.mentor}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
