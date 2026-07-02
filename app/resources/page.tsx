import SectionHeading from "@/components/SectionHeading";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const roadmaps = [
  { level: "Beginner", color: "border-green-400", dot: "bg-green-500", badge: "text-green-600 bg-green-100", topics: ["What is a satellite?", "Basics of space science", "Python fundamentals", "Introduction to Arduino", "How rockets work", "Joining a division"] },
  { level: "Intermediate", color: "border-blue-400", dot: "bg-blue-500", badge: "text-blue-600 bg-blue-100", topics: ["CanSat design", "Remote sensing basics", "Embedded C/C++", "Orbital mechanics", "Machine learning basics", "GIS with QGIS"] },
  { level: "Advanced", color: "border-purple-400", dot: "bg-purple-500", badge: "text-purple-600 bg-purple-100", topics: ["CubeSat subsystems", "Deep learning for satellite data", "ROS for robotics", "STM32 & RTOS", "Mission design with STK", "PCB design"] },
  { level: "Research", color: "border-pink-400", dot: "bg-pink-500", badge: "text-pink-600 bg-pink-100", topics: ["Research paper reading", "Literature review", "Writing & publishing", "Patent filing", "LaTeX basics", "Grant writing"] },
];

const resources = [
  { category: "Satellite & Space", icon: "🛰️", items: [
    { title: "CubeSat Design Specification", type: "PDF", link: "#" },
    { title: "ISRO Student Satellite Program Guide", type: "PDF", link: "#" },
    { title: "Orbital Mechanics for Engineering Students", type: "Book", link: "#" },
    { title: "STK (Systems Tool Kit) Tutorials", type: "Video", link: "#" },
  ]},
  { category: "Programming", icon: "💻", items: [
    { title: "Python for Space Data Analysis", type: "Course", link: "#" },
    { title: "MATLAB Onramp (Free)", type: "Course", link: "#" },
    { title: "Arduino Complete Reference", type: "PDF", link: "#" },
    { title: "ROS Beginner Guide", type: "Docs", link: "#" },
  ]},
  { category: "Remote Sensing & GIS", icon: "🗺️", items: [
    { title: "Google Earth Engine Beginner's Guide", type: "Docs", link: "#" },
    { title: "QGIS Training Manual", type: "PDF", link: "#" },
    { title: "Sentinel Hub EO Browser", type: "Tool", link: "#" },
    { title: "Remote Sensing Fundamentals", type: "Video", link: "#" },
  ]},
  { category: "Research & Writing", icon: "📄", items: [
    { title: "How to Write a Research Paper", type: "Guide", link: "#" },
    { title: "LaTeX Beginner Template", type: "Template", link: "#" },
    { title: "IEEE Paper Format Guidelines", type: "PDF", link: "#" },
    { title: "Scholar Metrics — Finding Journals", type: "Guide", link: "#" },
  ]},
];

const typeColors: Record<string, string> = {
  PDF: "text-red-600 bg-red-100",
  Book: "text-yellow-600 bg-yellow-100",
  Video: "text-blue-600 bg-blue-100",
  Course: "text-green-600 bg-green-100",
  Docs: "text-purple-600 bg-purple-100",
  Tool: "text-cyan-600 bg-cyan-100",
  Guide: "text-orange-600 bg-orange-100",
  Template: "text-pink-600 bg-pink-100",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-200 bg-white/20 rounded-full mb-4">Resources</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Everything You Need to Learn</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Curated study material, roadmaps, and tools for every level and every division.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Roadmaps" title="Your Learning Path" subtitle="Start where you are. Go as far as you want." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmaps.map((r) => (
            <div key={r.level} className={`glass rounded-2xl p-6 border-t-4 ${r.color}`}>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${r.badge}`}>{r.level}</span>
              <h3 className="text-gray-900 font-bold text-lg mt-3 mb-4">{r.level}</h3>
              <ul className="space-y-2">
                {r.topics.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-gray-500 text-sm">
                    <span className="text-gray-300 mt-0.5">→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading tag="Library" title="Resource Library" subtitle="Books, courses, tools, and templates — all in one place." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((cat) => (
              <div key={cat.category} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="text-gray-900 font-bold text-lg">{cat.category}</h3>
                </div>
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li key={item.title} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className={`shrink-0 text-xs px-2 py-0.5 rounded font-semibold ${typeColors[item.type] || "text-gray-500 bg-gray-100"}`}>{item.type}</span>
                        <span className="text-gray-600 text-sm truncate">{item.title}</span>
                      </div>
                      <a href={item.link} aria-label={`Open ${item.title}`} className="shrink-0 text-gray-400 hover:text-orange-500 transition-colors">
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

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-gray-400 mb-4">Want to contribute a resource to the library?</p>
        <Link href="/contact" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors">
          Submit a resource <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
