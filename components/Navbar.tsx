"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-lg"
        : "bg-transparent"
    }`}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center">
            <Rocket size={18} className="text-blue-400" />
          </div>
          <span className="font-bold text-lg" style={{ color: "var(--text)" }}>
            Space<span className="text-blue-400">Club</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm transition-colors hover:text-blue-400"
              style={{ color: "var(--text-muted)" }}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/join"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors font-medium"
          >
            Join Club
          </Link>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" style={{ color: "var(--text)" }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--border)] px-4 pb-6" style={{ background: "var(--bg)" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm border-b border-[var(--border)] transition-colors hover:text-blue-400"
              style={{ color: "var(--text-muted)" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/join"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg font-medium"
          >
            Join Club
          </Link>
        </div>
      )}
    </nav>
  );
}
