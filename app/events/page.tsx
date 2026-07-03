"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import StarField from "@/components/StarField";
import { Calendar, MapPin, Clock, Users, Loader, LogIn } from "lucide-react";
import { getStudentProfile, registerForEvent } from "@/lib/studentApi";

const events = [
  {
    id: "event-1",
    title: "Intro to CubeSat Workshop",
    type: "Workshop",
    status: "upcoming",
    date: "Jan 15, 2025",
    time: "10:00 AM – 4:00 PM",
    location: "College Lab, Block A",
    capacity: "30 seats",
    description: "Learn the fundamentals of CubeSat design — power systems, comms, structure, and payload. Hands-on session with real hardware.",
    color: "border-blue-400/50",
    badge: "text-blue-400 bg-blue-400/10",
  },
  {
    id: "event-2",
    title: "Astronomy Night — Saturn Opposition",
    type: "Observation",
    status: "upcoming",
    date: "Jan 22, 2025",
    time: "8:00 PM – 11:00 PM",
    location: "College Rooftop",
    capacity: "50 seats",
    description: "Saturn is at its closest to Earth. Join us for a live observation through our 10-inch reflector telescope.",
    color: "border-purple-400/50",
    badge: "text-purple-400 bg-purple-400/10",
  },
  {
    id: "event-3",
    title: "NASA Space Apps Hackathon Prep",
    type: "Hackathon",
    status: "upcoming",
    date: "Feb 5, 2025",
    time: "9:00 AM – 5:00 PM",
    location: "Seminar Hall",
    capacity: "60 seats",
    description: "Team formation, problem statement analysis, mock pitches, and review from mentors. Full-day prep for NASA Space Apps.",
    color: "border-orange-400/50",
    badge: "text-orange-400 bg-orange-400/10",
  },
  {
    id: "event-4",
    title: "Space Careers Webinar",
    type: "Webinar",
    status: "upcoming",
    date: "Feb 12, 2025",
    time: "6:00 PM – 8:00 PM",
    location: "Online (Google Meet)",
    capacity: "Unlimited",
    description: "Panel of ISRO scientists, space startup founders, and IIT researchers discuss career paths in the Indian space sector.",
    color: "border-cyan-400/50",
    badge: "text-cyan-400 bg-cyan-400/10",
  },
  {
    id: "event-5",
    title: "CanSat 2024 Launch Event",
    type: "Mission",
    status: "past",
    date: "Oct 20, 2024",
    time: "8:00 AM – 5:00 PM",
    location: "Sports Ground, Campus",
    capacity: "Full",
    description: "Successful launch and recovery of our CanSat mission. Collected atmospheric data from 1km altitude. Finished in national top 5.",
    color: "border-green-400/50",
    badge: "text-green-400 bg-green-400/10",
  },
  {
    id: "event-6",
    title: "ISRO Visit — Thiruvananthapuram",
    type: "Visit",
    status: "past",
    date: "Sep 5, 2024",
    time: "All Day",
    location: "VSSC, Thiruvananthapuram",
    capacity: "25 students",
    description: "Students toured VSSC facilities, attended presentations by ISRO scientists, and interacted with the satellite assembly team.",
    color: "border-yellow-400/50",
    badge: "text-yellow-400 bg-yellow-400/10",
  },
];

export default function EventsPage() {
  const { data: session, status } = useSession();
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [profile, setProfile] = useState<any>(null);
  const [registering, setRegistering] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [studentLoading, setStudentLoading] = useState(true);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  useEffect(() => {
    if (session?.user?.email) {
      getStudentProfile(session.user.email, session.user.name || "", session.user.image || "")
        .then(p => setProfile(p))
        .catch(() => {})
        .finally(() => setStudentLoading(false));
    } else {
      setStudentLoading(false);
    }
  }, [session]);

  const filtered = events.filter((e) => filter === "all" ? true : e.status === filter);

  const handleRegister = async (eventId: string, title: string) => {
    if (!session?.user?.email) {
      signIn("google", { callbackUrl: "/events" });
      return;
    }
    setRegistering(eventId);
    try {
      await registerForEvent(session.user.email, eventId, title);
      showToast(`✅ Registered for ${title}! +5 points`);
      // Refresh profile to show updated events
      const updated = await getStudentProfile(session.user.email);
      setProfile(updated);
    } catch (err: any) {
      if (err.message.includes("Already registered")) {
        showToast("You're already registered for this event.");
      } else {
        showToast("Registration failed. Try again.");
      }
    }
    setRegistering(null);
  };

  const isRegistered = (eventId: string) => {
    return profile?.registeredEvents?.some((e: any) => e.eventId === eventId);
  };

  const isApprovedMember = profile?.applicationStatus === "approved";

  return (
    <div className="min-h-screen bg-[#050a14] pt-24">
      {toast && <div className="fixed top-24 right-4 z-50 px-4 py-2 bg-green-600 text-white text-sm rounded-xl shadow-lg">{toast}</div>}

      <section className="relative py-20 overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">
            Events
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Events & <span className="gradient-text">Activities</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Workshops, observations, hackathons, visits, and webinars — all year round.
          </p>
          {!session && (
            <div className="mt-6">
              <p className="text-slate-400 text-sm mb-2">Sign in with your Google account to register for events and earn points.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 pb-24 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-10">
          {(["all", "upcoming", "past"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {filtered.map((ev) => {
            const registered = isRegistered(ev.id);
            const canRegister = ev.status === "upcoming" && !registered && isApprovedMember;
            const needsApproval = ev.status === "upcoming" && !registered && session && !isApprovedMember;
            const needsLogin = ev.status === "upcoming" && !session;

            return (
              <div
                key={ev.id}
                className={`glass rounded-2xl p-6 border-l-4 ${ev.color} glass-hover`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ev.badge}`}>
                        {ev.type}
                      </span>
                      {ev.status === "past" && (
                        <span className="text-xs px-2 py-0.5 rounded-full text-slate-500 bg-white/5">Past</span>
                      )}
                      {registered && (
                        <span className="text-xs px-2 py-0.5 rounded-full text-green-400 bg-green-400/10 font-semibold">✓ Registered</span>
                      )}
                    </div>
                    <h2 className="text-white font-bold text-lg mb-2">{ev.title}</h2>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{ev.description}</p>
                    <div className="flex flex-wrap gap-4 text-slate-400 text-xs">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {ev.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {ev.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {ev.location}</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {ev.capacity}</span>
                    </div>
                  </div>
                  {ev.status === "upcoming" && (
                    <div className="shrink-0">
                      {needsLogin && (
                        <button
                          onClick={() => signIn("google", { callbackUrl: "/events" })}
                          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-all"
                        >
                          <LogIn size={16} /> Sign in to Register
                        </button>
                      )}
                      {needsApproval && (
                        <div className="text-center">
                          <button disabled className="px-5 py-2.5 bg-slate-600 text-slate-400 text-sm font-medium rounded-xl">
                            Awaiting Approval
                          </button>
                          <p className="text-xs text-slate-500 mt-1">Your application must be approved first.</p>
                        </div>
                      )}
                      {canRegister && (
                        <button
                          onClick={() => handleRegister(ev.id, ev.title)}
                          disabled={registering === ev.id}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {registering === ev.id ? (
                            <>
                              <Loader size={14} className="animate-spin" /> Registering...
                            </>
                          ) : (
                            "Register Now"
                          )}
                        </button>
                      )}
                      {registered && (
                        <div className="text-center">
                          <button disabled className="px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl">
                            ✓ Registered
                          </button>
                          <p className="text-xs text-green-400 mt-1">+5 points earned!</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info box */}
        <div className="glass rounded-2xl p-6 mt-8 border-l-4 border-blue-400/50">
          <h3 className="text-white font-semibold mb-2">How Event Registration Works</h3>
          <ul className="text-slate-400 text-sm space-y-1">
            <li className="flex items-center gap-2">✅ Sign in with your Google account</li>
            <li className="flex items-center gap-2">✅ Your application must be approved by the admin</li>
            <li className="flex items-center gap-2">✅ Register for upcoming events — earn 5 points each</li>
            <li className="flex items-center gap-2">✅ View your events and points in your <a href="/dashboard" className="text-blue-400 hover:text-blue-300 underline">Dashboard</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
