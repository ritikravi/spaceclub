import SectionHeading from "@/components/SectionHeading";
import StarField from "@/components/StarField";
import { BookOpen, Video, ExternalLink, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

const roadmaps = [
  {
    level: "Beginner",
    color: "text-green-400 border-green-400/30 bg-green-400/5",
    dot: "bg-green-400",
    topics: ["What is a satellite?", "Basics of space science", "Python fundamentals", "Introduction to Arduino", "How rockets work", "Joining a division"],
  },
  {
    level: "Intermediate",
    color: "text-blue-400 border-blue-400/30 bg-blue-400/5",
    dot: "bg-blue-400",
    topics: ["CanSat design", "Remote sensing basics", "Embedded C/C++", "Orbital mechanics", "Machine learning basics", "GIS with QGIS"],
  },
  {
    level: "Advanced",
    color: "text-purple-400 border-purple-400/30 bg-purple-400/5",
    dot: "bg-purple-400",
    topics: ["CubeSat subsystems", "Deep learning for satellite data", "ROS for robotics", "STM32 & RTOS", "Mission design with STK", "PCB design"],
  },
  {
    level: "Research",
    color: "text-pink-400 border-pink-400/30 bg-pink-400/5",
    dot: "bg-pink-400",
    topics: ["Research paper reading", "Literature review", "Writing & publishing", "Patent filing", "LaTeX basics", "Grant writing"],
  },
];

const resources = [
  {
    category: "Satellite & Space",
    icon: "🛰️",
    items: [
      { title: "CubeSat Design Specification", type: "PDF", link: "#" },
      { title: "ISRO Student Satellite Program Guide", type: "PDF", link: "#" },
      { title: "Orbital Mechanics for Engineering Students", type: "Book", link: "#" },
      { title: "STK (Systems Tool Kit) Tutorials", type: "Video", link: "#" },
    ],
  },
  {
    category: "Programming",
    icon: "💻",
    items: [
      { title: "Python for Space Data Analysis", type: "Course", link: "#" },
      { title: "MATLAB Onramp (Free)", type: "Course", link: "#" },
      { title: "Arduino Complete Reference", type: "PDF", link: "#" },
      { title: "ROS Beginner Guide", type: "Docs", link: "#" },
    ],
  },
  {
    category: "Remote Sensing & GIS",
    icon: "🗺️",
    items: [
      { title: "Google Earth Engine Beginner's Guide", type: "Docs", link: "#" },
      { title: "QGIS Training Manual", type: "PDF", link: "#" },
      { title: "Sentinel Hub EO Browser", type: "Tool", link: "#" },
      { title: "Remote Sensing Fundamentals", type: "Video", link: "#" },
    ],
  },
  {
    category: "Research & Writing",
    icon: "📄",
    items: [
      { title: "How to Write a Research Paper", type: "Guide", link: "#" },
      { title: "LaTeX Beginner Template", type: "Template", link: "#" },
      { title: "IEEE Paper Format Guidelines", type: "PDF", link: "#" },
      { title: "Scholar Metrics — Finding Journals", type: "Guide", link: "#" },
    ],
  },
];

const typeColors: Record<string, string> = {
  PDF: "text-red-400 bg-red-400/10",
  Book: "text-yellow-400 bg-yellow-400/10",
  Video: "text-blue-400 bg-blue-400/10",
  Course: "text-green-400 bg-green-400/10",
  Docs: "text-purple-400 bg-purple-400/10",
  Tool: "text-cyan-400 bg-cyan-400/10",
  Guide: "text-orange-400 bg-orange-400/10",
  Template: "text-pink-400 bg-pink-400/10",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#050a14] pt-24">
      <section className="relative py-20 overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">
            Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Everything You <span className="gradient-text">Need to Learn</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Curated study material, roadmaps, and tools for every level and every division.
          </p>
        </div>
      </section>

      {/* Roadmaps */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Roadmaps" title="Your Learning Path" subtitle="Start where you are. Go as far as you want." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmaps.map((r) => (
            <div key={r.level} className={`glass rounded-2xl p-6 border ${r.color}`}>
              <div className={`w-3 h-3 rounded-full ${r.dot} mb-4`} />
              <h3 className="text-white font-bold text-lg mb-4">{r.level}</h3>
              <ul className="space-y-2">
                {r.topics.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-slate-400 text-sm">
                    <span className="text-slate-600 mt-0.5">→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Resource library */}
      <section className="py-16 bg-[#060c18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading tag="Library" title="Resource Library" subtitle="Books, courses, tools, and templates — all in one place." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((cat) => (
              <div key={cat.category} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="text-white font-bold text-lg">{cat.category}</h3>
                </div>
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li key={item.title} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className={`shrink-0 text-xs px-2 py-0.5 rounded font-medium ${typeColors[item.type] || "text-slate-400 bg-white/5"}`}>
                          {item.type}
                        </span>
                        <span className="text-slate-300 text-sm truncate">{item.title}</span>
                      </div>
                      <a
                        href={item.link}
                        aria-label={`Open ${item.title}`}
                        className="shrink-0 text-slate-500 hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-slate-400 mb-4">Want to contribute a resource to the library?</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
        >
          Submit a resource <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
