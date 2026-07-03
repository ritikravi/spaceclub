"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Rocket, Bell, LogIn, LayoutDashboard } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useSession, signIn } from "next-auth/react";
import { getStudentProfile } from "@/lib/studentApi";

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
  const [unread, setUnread] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Poll unread count every 30s when signed in
  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchUnread = () => {
      getStudentProfile(session.user!.email!, session.user!.name || "", session.user!.image || "")
        .then(p => setUnread(p?.notifications?.filter((n: any) => !n.read).length || 0))
        .catch(() => {});
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [session]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-lg"
        : "bg-transparent"
    }`}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center">
            <Rocket size={18} className="text-blue-400" />
          </div>
          <span className="font-bold text-lg" style={{ color: "var(--text)" }}>
            LPU <span className="text-blue-400">Space Club</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm transition-colors hover:text-blue-400"
              style={{ color: "var(--text-muted)" }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          {session?.user ? (
            <>
              {/* Bell with unread badge */}
              <Link href="/dashboard?tab=notifications" className="relative w-9 h-9 flex items-center justify-center rounded-full transition-all hover:bg-blue-400/10" style={{ color: "var(--text-muted)" }}>
                <Bell size={18} />
                {unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Link>
              {/* Avatar → dashboard */}
              <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all hover:bg-blue-400/10 border border-[var(--border)]">
                {session.user.image ? (
                  <img src={session.user.image} alt="avatar" className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {session.user.name?.slice(0,1).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                  {session.user.name?.split(" ")[0]}
                </span>
              </Link>
            </>
          ) : (
            <button onClick={() => signIn("google")}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-sm rounded-lg transition-colors font-medium"
              style={{ color: "var(--text)" }}>
              <LogIn size={15} /> Sign In
            </button>
          )}
          <Link href="/join" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors font-medium">
            Join Club
          </Link>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          {session?.user && (
            <Link href="/dashboard" className="relative">
              {session.user.image ? (
                <img src={session.user.image} alt="avatar" className="w-8 h-8 rounded-full border border-blue-400/30" />
              ) : (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {session.user.name?.slice(0,1)}
                </div>
              )}
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unread}</span>
              )}
            </Link>
          )}
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" style={{ color: "var(--text)" }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--border)] px-6 pb-6" style={{ background: "var(--bg)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3 text-sm border-b border-[var(--border)] transition-colors hover:text-blue-400"
              style={{ color: "var(--text-muted)" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/dashboard" onClick={() => setOpen(false)}
            className="block py-3 text-sm border-b border-[var(--border)] transition-colors hover:text-blue-400 flex items-center gap-2"
            style={{ color: "var(--text-muted)" }}>
            <LayoutDashboard size={15} /> Dashboard
            {unread > 0 && <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-1.5 font-bold">{unread}</span>}
          </Link>
          {!session?.user ? (
            <button onClick={() => { signIn("google"); setOpen(false); }}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--border)] text-sm rounded-lg font-medium transition-all hover:bg-blue-400/10"
              style={{ color: "var(--text)" }}>
              <LogIn size={15}/> Sign In with Google
            </button>
          ) : null}
          <Link href="/join" onClick={() => setOpen(false)}
            className="mt-4 block text-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg font-medium">
            Join Club
          </Link>
        </div>
      )}
    </nav>
  );
}
