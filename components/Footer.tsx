"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Rocket, GitBranch, Camera, Link2, Mail, MessageCircle } from "lucide-react";

const footerLinks = {
  Club: [
    { label: "About", href: "/about" },
    { label: "Divisions", href: "/divisions" },
    { label: "Programs", href: "/programs" },
    { label: "Achievements", href: "/about#achievements" },
  ],
  Learn: [
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Competitions", href: "/programs#competitions" },
  ],
  Connect: [
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Join", href: "/join" },
  ],
};

const API = process.env.NEXT_PUBLIC_API_URL || "https://spaceclub.onrender.com";

const fallbackFaculty = [
  { _id: "1", name: "Dr. Jaisukh Paul", role: "Faculty Head", avatar: "JP", color: "bg-blue-600", type: "faculty" },
  { _id: "2", name: "Rohan Kumar", role: "Faculty Coordinator", avatar: "RK", color: "bg-indigo-600", type: "faculty" },
];

const fallbackLeads = [
  { _id: "3", name: "Ayush Pratap Singh", role: "Student Lead", avatar: "AS", color: "bg-purple-600", type: "student-lead" },
  { _id: "4", name: "Ritik Raushan", role: "Student Lead", avatar: "RR", color: "bg-cyan-600", type: "student-lead" },
];

const avatarColors = ["bg-blue-600","bg-purple-600","bg-cyan-600","bg-indigo-600","bg-pink-600","bg-green-600","bg-orange-600","bg-rose-600"];

type Member = {
  _id: string;
  name: string;
  role: string;
  avatar?: string;
  photo?: string;
  linkedin?: string;
  github?: string;
  type: string;
  color?: string;
};

function MemberCard({ m, idx }: { m: Member; idx: number }) {
  const color = m.color || avatarColors[idx % avatarColors.length];
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-1.5 group">
      {/* Avatar / Photo */}
      <div className="relative">
        {m.photo ? (
          <img src={m.photo} alt={m.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-blue-400/60 transition-all" />
        ) : (
          <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white/10 group-hover:border-blue-400/60 transition-all`}>
            {m.avatar || m.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
        )}
        {/* Social links hover overlay */}
        {(m.linkedin || m.github) && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all flex gap-1">
            {m.linkedin && (
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                title="LinkedIn">
                <Link2 size={9} className="text-white" />
              </a>
            )}
            {m.github && (
              <a href={m.github} target="_blank" rel="noopener noreferrer"
                className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                title="GitHub">
                <GitBranch size={9} className="text-white" />
              </a>
            )}
          </div>
        )}
      </div>
      <div className="text-center">
        <div className="text-xs font-semibold leading-tight" style={{ color: "var(--text)" }}>{m.name.split(" ").slice(0, 2).join(" ")}</div>
        <div className="text-[10px] leading-tight" style={{ color: "var(--text-faint)" }}>{m.role}</div>
      </div>
    </div>
  );
}

function ScrollBox({ title, color, members, boxRef }: { title: string; color: string; members: Member[]; boxRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="flex-1 min-w-0">
      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${color}`}>{title}</p>
      <div
        ref={boxRef}
        className="flex gap-5 overflow-x-auto pb-2 pr-2 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          maxWidth: "100%",
        }}
      >
        {members.map((m, i) => <MemberCard key={m._id} m={m} idx={i} />)}
        {members.length === 0 && (
          <p className="text-xs italic" style={{ color: "var(--text-faint)" }}>No members yet.</p>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  const [faculty, setFaculty] = useState<Member[]>(fallbackFaculty);
  const [leads, setLeads] = useState<Member[]>(fallbackLeads);
  const facultyRef = useRef<HTMLDivElement>(null);
  const leadsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API}/api/admin/public-members`)
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        setFaculty(data.filter((m: Member) => m.type === "faculty"));
        setLeads(data.filter((m: Member) => m.type === "student-lead" || m.type === "core"));
      })
      .catch(() => {}); // silently fall back to defaults
  }, []);

  return (
    <footer className="border-t" style={{ background: "var(--bg-alt)", borderColor: "var(--border)" }}>
      {/* Team strip */}
      <div className="border-b py-6" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">

            {/* Faculty box */}
            <ScrollBox
              title="Guided By — Faculty"
              color="text-blue-400"
              members={faculty}
              boxRef={facultyRef}
            />

            <div className="hidden md:block w-px self-stretch" style={{ background: "var(--border)" }} />

            {/* Student leads box */}
            <ScrollBox
              title="Led By — Students"
              color="text-purple-400"
              members={leads}
              boxRef={leadsRef}
            />

            <div className="hidden md:block w-px self-stretch" style={{ background: "var(--border)" }} />

            {/* Admin */}
            <div className="shrink-0">
              <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">Club Admin</p>
              <Link href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-400/30 text-blue-400 text-xs font-medium rounded-lg transition-all">
                🔐 Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="pt-12 pb-8">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center">
                  <Rocket size={18} className="text-blue-400" />
                </div>
                <span className="font-bold text-lg" style={{ color: "var(--text)" }}>
                  Space<span className="text-blue-400">Club</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--text-muted)" }}>
                Building the next generation of space scientists, engineers, and innovators — one launch at a time.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: GitBranch, label: "GitHub" },
                  { icon: Camera, label: "Instagram" },
                  { icon: Link2, label: "LinkedIn" },
                  { icon: MessageCircle, label: "Discord" },
                  { icon: Mail, label: "Email" },
                ].map(({ icon: Icon, label }) => (
                  <a key={label} href="#" aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:text-blue-400"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>{title}</h4>
                <ul className="space-y-2">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm transition-colors hover:text-blue-400" style={{ color: "var(--text-muted)" }}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--text-faint)" }}>© 2024 Space Club, LPU. All rights reserved.</p>
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>Inspiring students to reach for the stars.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
