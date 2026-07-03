"use client";
import { useEffect, useState } from "react";
import { X, Megaphone } from "lucide-react";
import { getPublicAnnouncements } from "@/lib/api";

const typeStyles: Record<string, string> = {
  info: "bg-blue-600 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-yellow-500 text-black",
  urgent: "bg-red-600 text-white",
};

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    getPublicAnnouncements().then(setAnnouncements).catch(() => {});
  }, []);

  const visible = announcements.filter((a) => !dismissed.includes(a._id));
  if (visible.length === 0) return null;

  const top = visible[0];

  return (
    <div className={`w-full z-40 ${typeStyles[top.type] || typeStyles.info}`}>
      <div className="max-w-screen-xl mx-auto px-6 py-2.5 flex items-center gap-3">
        <Megaphone size={15} className="shrink-0" />
        <div className="flex-1 text-sm font-medium truncate">
          <span className="font-bold mr-2">{top.title}:</span>
          {top.message}
        </div>
        {visible.length > 1 && (
          <span className="text-xs opacity-75 shrink-0">+{visible.length - 1} more</span>
        )}
        <button
          onClick={() => setDismissed((d) => [...d, top._id])}
          className="shrink-0 opacity-75 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
