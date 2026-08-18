"use client";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Phone, X } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://spaceclub.onrender.com";

export default function FeaturedEventBanner() {
  const [event, setEvent] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);
  const [imgOpen, setImgOpen] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/featured-event`)
      .then(r => r.json())
      .then(d => { if (d?._id) setEvent(d); })
      .catch(() => {});
  }, []);

  if (!event || dismissed) return null;

  return (
    <>
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-orange-600/90 via-orange-500/90 to-yellow-500/90 backdrop-blur-sm z-40 border-b border-orange-400/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Image thumbnail */}
          {event.image && (
            <button onClick={() => setImgOpen(true)} className="shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 border-white/30 hover:border-white/60 transition-all">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            </button>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Featured Event</span>
              <span className="text-xs text-orange-100 font-semibold">{event.type}</span>
            </div>
            <div className="font-bold text-white text-sm sm:text-base leading-tight truncate">{event.title}</div>
            <div className="flex flex-wrap gap-3 mt-1 text-xs text-orange-100">
              {event.date && <span className="flex items-center gap-1"><Calendar size={11} />{event.date}</span>}
              {event.time && <span className="flex items-center gap-1"><Clock size={11} />{event.time}</span>}
              {event.location && <span className="flex items-center gap-1"><MapPin size={11} />{event.location}</span>}
              {event.registrationContact && <span className="flex items-center gap-1"><Phone size={11} />Reg: {event.registrationContact}</span>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {event.image && (
              <button onClick={() => setImgOpen(true)}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-all border border-white/20">
                View Flyer
              </button>
            )}
            <button onClick={() => setDismissed(true)} className="text-white/70 hover:text-white transition-colors p-1">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Flyer modal */}
      {imgOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setImgOpen(false)}>
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setImgOpen(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-1 text-sm">
              <X size={16} /> Close
            </button>
            <img src={event.image} alt={event.title} className="w-full rounded-2xl shadow-2xl" />
            <div className="mt-3 text-center text-white font-semibold">{event.title}</div>
            {event.registrationContact && (
              <div className="text-center text-orange-300 text-sm mt-1">📞 {event.registrationContact}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
