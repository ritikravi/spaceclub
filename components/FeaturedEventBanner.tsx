"use client";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Phone, X, Sparkles } from "lucide-react";

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
      {/* Full-width featured section — pt-20 accounts for fixed navbar height */}
      <div className="w-full relative overflow-hidden pt-20" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, #f97316 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="flex flex-col lg:flex-row gap-10 items-center">

            {/* Flyer image — large, preserves full aspect ratio */}
            {event.image && (
              <button onClick={() => setImgOpen(true)} className="shrink-0 w-full lg:w-auto group">
                <div className="relative mx-auto lg:mx-0 w-full max-w-md lg:max-w-xl overflow-hidden rounded-2xl shadow-2xl border border-orange-400/30 group-hover:border-orange-400/60 transition-all">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-auto object-contain group-hover:scale-[1.015] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-black/70 text-white text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/20">
                      View Full Flyer
                    </span>
                  </div>
                </div>
              </button>
            )}

            {/* Event info */}
            <div className="flex-1 min-w-0 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold rounded-full uppercase tracking-wider">
                  <Sparkles size={11} /> Featured Event
                </span>
                {event.type && <span className="text-xs text-slate-400 font-medium">{event.type}</span>}
              </div>

              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white mb-4 leading-tight">
                {event.title}
              </h2>

              {event.description && (
                <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {event.description}
                </p>
              )}

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-7 text-sm text-slate-300">
                {event.date && (
                  <span className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                    <Calendar size={14} className="text-orange-400" /> {event.date}
                  </span>
                )}
                {event.time && (
                  <span className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                    <Clock size={14} className="text-orange-400" /> {event.time}
                  </span>
                )}
                {event.location && (
                  <span className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                    <MapPin size={14} className="text-orange-400" /> {event.location}
                  </span>
                )}
                {event.registrationContact && (
                  <span className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                    <Phone size={14} className="text-orange-400" /> {event.registrationContact}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {event.image && (
                  <button onClick={() => setImgOpen(true)}
                    className="px-7 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/30">
                    View Event Flyer →
                  </button>
                )}
                <button onClick={() => setDismissed(true)}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-sm rounded-xl border border-white/10 transition-all">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => setDismissed(true)}
          className="absolute top-24 right-4 text-white/30 hover:text-white/70 transition-colors z-20">
          <X size={18} />
        </button>
      </div>

      {/* Full flyer modal */}
      {imgOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setImgOpen(false)}>
          <div className="relative w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setImgOpen(false)}
              className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
              <X size={15} /> Close
            </button>
            <img src={event.image} alt={event.title}
              className="w-full h-auto rounded-2xl shadow-2xl"
              style={{ maxHeight: "90vh", objectFit: "contain" }} />
            {event.registrationContact && (
              <div className="text-center text-orange-300 text-sm mt-3 font-medium">
                📞 Registration: {event.registrationContact}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
