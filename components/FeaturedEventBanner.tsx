"use client";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Phone, X, Sparkles, ExternalLink } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://spaceclub.onrender.com";

export default function FeaturedEventBanner() {
  const [event, setEvent] = useState<any>(null);
  const [imgOpen, setImgOpen] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/featured-event`)
      .then(r => r.json())
      .then(d => { if (d?._id) setEvent(d); })
      .catch(() => {});
  }, []);

  if (!event) return null;

  return (
    <>
      <div className="w-full relative overflow-hidden" style={{ background: "linear-gradient(135deg, #060b18 0%, #0f1635 40%, #1a0a2e 70%, #060b18 100%)" }}>
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #f97316, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }} />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center">

            {/* Flyer — large portrait image with full quality */}
            {event.image && (
              <div className="shrink-0 w-full lg:w-auto flex justify-center lg:justify-start">
                <button onClick={() => setImgOpen(true)} className="group block">
                  <div className="relative rounded-3xl shadow-2xl border-2 border-orange-400/30 group-hover:border-orange-400/70 transition-all duration-300 overflow-hidden" style={{ boxShadow: "0 0 60px rgba(249,115,22,0.2)" }}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="block max-w-none h-auto group-hover:scale-[1.02] transition-transform duration-500"
                      style={{ width: "auto", maxHeight: "70vh", imageRendering: "-webkit-optimize-contrast" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                      <span className="bg-black/80 text-white text-sm font-bold px-6 py-3 rounded-xl border border-white/20">
                        🔍 View Full Flyer
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange-500/20 border border-orange-400/50 text-orange-300 text-xs font-bold rounded-full uppercase tracking-widest">
                  <Sparkles size={12} /> Featured Event
                </span>
                {event.type && <span className="text-sm text-slate-400 font-medium">{event.type}</span>}
              </div>

              <h2 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white mb-5 leading-tight">
                {event.title}
              </h2>

              {event.description && (
                <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {event.description}
                </p>
              )}

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                {event.date && (
                  <span className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200">
                    <Calendar size={15} className="text-orange-400" /> {event.date}
                  </span>
                )}
                {event.time && (
                  <span className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200">
                    <Clock size={15} className="text-orange-400" /> {event.time}
                  </span>
                )}
                {event.location && (
                  <span className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200">
                    <MapPin size={15} className="text-orange-400" /> {event.location}
                  </span>
                )}
                {event.registrationContact && (
                  <span className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200">
                    <Phone size={15} className="text-orange-400" /> {event.registrationContact}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {/* Register button */}
                {event.registrationLink ? (
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-base rounded-2xl transition-all shadow-xl shadow-orange-500/40 hover:shadow-orange-400/50 hover:scale-105">
                    Register Now <ExternalLink size={16} />
                  </a>
                ) : (
                  <a href="/events"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-base rounded-2xl transition-all shadow-xl shadow-orange-500/40 hover:shadow-orange-400/50 hover:scale-105">
                    Register Now →
                  </a>
                )}
                {event.image && (
                  <button onClick={() => setImgOpen(true)}
                    className="inline-flex items-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold text-base rounded-2xl border border-white/20 hover:border-white/40 transition-all">
                    View Flyer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full flyer modal - Full quality view */}
      {imgOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4" onClick={() => setImgOpen(false)}>
          <div className="relative flex flex-col items-center max-h-screen" onClick={e => e.stopPropagation()}>
            <button onClick={() => setImgOpen(false)}
              className="mb-4 flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors bg-black/50 px-4 py-2 rounded-full">
              <X size={15} /> Close
            </button>
            <img src={event.image} alt={event.title}
              className="rounded-2xl shadow-2xl"
              style={{ maxHeight: "85vh", width: "auto", maxWidth: "100%", imageRendering: "-webkit-optimize-contrast" }} />
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
