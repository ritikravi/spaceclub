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

export default function Footer() {
  return (
    <footer className="bg-[#030810] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center">
                <Rocket size={18} className="text-blue-400" />
              </div>
              <span className="font-bold text-lg text-white">
                Space<span className="text-blue-400">Club</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Building the next generation of space scientists, engineers, researchers, and innovators — one launch at a time.
            </p>
            <div className="flex gap-4">
              {[
                { icon: GitBranch, href: "#", label: "GitHub" },
                { icon: Camera, href: "#", label: "Instagram" },
                { icon: Link2, href: "#", label: "LinkedIn" },
                { icon: MessageCircle, href: "#", label: "Discord" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-400/50 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 Space Club. Built with passion for the cosmos.
          </p>
          <p className="text-slate-600 text-xs">
            Inspiring students to reach for the stars.
          </p>
        </div>
      </div>
    </footer>
  );
}
