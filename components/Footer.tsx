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
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
                <Rocket size={18} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-base text-white">Space</span>
                <span className="font-bold text-base text-orange-400">Club</span>
                <div className="text-[10px] text-gray-400 leading-none -mt-0.5">Lovely Professional University</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Building the next generation of space scientists, engineers, and innovators at LPU — one launch at a time.
            </p>
            <div className="flex gap-3">
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
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-gray-700 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2024 Space Club, LPU. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Inspiring students to reach for the stars.</p>
        </div>
      </div>
    </footer>
  );
}
