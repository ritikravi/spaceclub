import Link from "next/link";
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

const faculty = [
  { name: "Dr. Jaisukh Paul", role: "Faculty Head", avatar: "JP", color: "bg-blue-600" },
  { name: "Rohan Kumar", role: "Faculty Coordinator", avatar: "RK", color: "bg-indigo-600" },
];

const leads = [
  { name: "Ayush Pratap Singh", role: "Student Lead", avatar: "AS", color: "bg-purple-600" },
  { name: "Ritik Raushan", role: "Student Lead", avatar: "RR", color: "bg-cyan-600" },
];

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: "var(--bg-alt)", borderColor: "var(--border)" }}>
      {/* Team strip */}
      <div className="border-b py-8" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            {/* Faculty */}
            <div>
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Guided By — Faculty</p>
              <div className="flex gap-4">
                {faculty.map((f) => (
                  <div key={f.name} className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${f.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {f.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{f.name}</div>
                      <div className="text-xs" style={{ color: "var(--text-faint)" }}>{f.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-[var(--border)]" />

            {/* Student Leads */}
            <div>
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Led By — Students</p>
              <div className="flex gap-4">
                {leads.map((l) => (
                  <div key={l.name} className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${l.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {l.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{l.name}</div>
                      <div className="text-xs" style={{ color: "var(--text-faint)" }}>{l.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-[var(--border)]" />

            {/* Admin link */}
            <div>
              <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">Club Admin</p>
              <Link href="/admin" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-400/30 text-blue-400 text-xs font-medium rounded-lg transition-all">
                🔐 Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
