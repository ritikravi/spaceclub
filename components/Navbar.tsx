"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Divisions", href: "/divisions" },
  { label: "Programs", href: "/programs" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm border-b border-gray-200" : "bg-white border-b border-gray-100"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
            <Rocket size={15} className="text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-sm text-gray-900">SpaceClub <span className="text-blue-700">LPU</span></div>
            <div className="text-[10px] text-gray-400">Lovely Professional University</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all">
              {l.label}
            </Link>
          ))}
          <Link href="/join" className="ml-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm rounded-lg font-semibold shadow-sm transition-all">
            Join Club
          </Link>
        </div>

        <button className="lg:hidden text-gray-700" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4 shadow-md">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3 text-gray-600 hover:text-blue-700 text-sm border-b border-gray-50 transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/join" onClick={() => setOpen(false)}
            className="mt-3 block text-center px-4 py-2.5 bg-blue-700 text-white text-sm rounded-lg font-semibold">
            Join Club
          </Link>
        </div>
      )}
    </nav>
  );
}
