"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all
        bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20
        light:bg-gray-100 light:hover:bg-gray-200 border border-white/10 dark:border-white/10"
    >
      {theme === "dark"
        ? <Sun size={16} className="text-yellow-400" />
        : <Moon size={16} className="text-slate-600" />
      }
    </button>
  );
}
