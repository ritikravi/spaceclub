"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Rocket, Star, Crown } from "lucide-react";
import { submitJoinForm } from "@/lib/api";
import { signIn, signOut, useSession } from "next-auth/react";

const tiers = [
  { icon: Rocket, title: "Cosmos Member", tier: "Tier 1", price: "Free", border: "border-t-4 border-blue-400", iconBg: "bg-blue-50 dark:bg-blue-400/10", iconColor: "text-blue-500", badge: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-400/10", perks: ["Access to all public events", "Weekly webinar invites", "Discord community access", "Learning resources library", "Monthly newsletter"] },
  { icon: Star, title: "Space Club Member", tier: "Tier 2", price: "₹500/year", border: "border-t-4 border-blue-500", iconBg: "bg-blue-50 dark:bg-blue-400/10", iconColor: "text-blue-500", badge: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-400/10", popular: true, perks: ["Everything in Tier 1", "Division membership", "Project participation", "Hackathon team priority", "Club ID card & certificate", "Space Camp discounts"] },
  { icon: Crown, title: "Core Fellow", tier: "Tier 3", price: "By invitation", border: "border-t-4 border-purple-400", iconBg: "bg-purple-50 dark:bg-purple-400/10", iconColor: "text-purple-500", badge: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-400/10", perks: ["Everything in Tier 2", "Core team leadership roles", "ISRO visit priority", "Research mentorship", "Industry connections", "Letter of recommendation"] },
];

const divisions = ["Aerospace", "Robotics", "AI & Data", "Embedded Systems", "Software", "Research", "Astronomy", "Media & Design"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "PG / PhD"];

export default function JoinPage() {
  const { data: session, status } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", year: "", branch: "", division: "", why: "" });

  // Pre-fill from Google session
  useEffect(() => {
    if (session?.user) {
      setForm(f => ({
        ...f,
        name: f.name || session.user?.name || "",
        email: f.email || session.user?.email || "",
      }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await submitJoinForm(form);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen section-bg">
      {/* Hero */}
      <section className="py-20 section-bg-alt">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">Membership</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6" style={{ color: "var(--text)" }}>
            Join <span className="gradient-text">SpaceClub LPU</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Start as a Cosmos Member. Work your way up through involvement and contribution.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-screen-xl mx-auto px-6 sm:px-10">
        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {tiers.map((t) => (
            <div key={t.title} className={`glass rounded-2xl p-7 ${t.border} relative ${t.popular ? "ring-2 ring-blue-500 shadow-lg" : ""}`}>
              {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">Most Popular</div>}
              <div className={`w-12 h-12 ${t.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <t.icon size={22} className={t.iconColor} />
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${t.badge}`}>{t.tier}</span>
              <h3 className="font-bold text-xl mt-2 mb-1" style={{ color: "var(--text)" }}>{t.title}</h3>
              <div className="text-2xl font-extrabold mb-5" style={{ color: "var(--text)" }}>{t.price}</div>
              <ul className="space-y-2">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>Apply Now</h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Sign in with your Google account to apply. We'll confirm within 48 hours.</p>
          </div>

          {submitted ? (
            <div className="glass rounded-2xl p-10 text-center border-t-4 border-blue-500">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="font-bold text-2xl mb-2" style={{ color: "var(--text)" }}>Application Submitted!</h3>
              <p style={{ color: "var(--text-muted)" }}>We've received your application. You'll hear back within 48 hours.</p>
            </div>
          ) : status === "loading" ? (
            <div className="text-center py-10" style={{ color: "var(--text-muted)" }}>Loading...</div>
          ) : !session ? (
            /* Not signed in — show Google sign in */
            <div className="glass rounded-2xl p-10 text-center border-t-4 border-blue-500">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="font-bold text-xl mb-2" style={{ color: "var(--text)" }}>Sign in to Apply</h3>
              <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                We use Google Sign-In to verify your identity. No fake applications.
              </p>
              <button
                onClick={() => signIn("google", { callbackUrl: "/join" })}
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-md transition-all text-sm border border-gray-200 mx-auto"
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.8 6C12.4 13.1 17.8 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.9-10 6.9-17z"/>
                  <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.7 10.7l7.8-6z"/>
                  <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.8l-7.8 6C6.7 42.6 14.7 48 24 48z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          ) : (
            /* Signed in — show form */
            <div className="glass rounded-2xl p-8 border-t-4 border-blue-500">
              {/* User info strip */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-3">
                  {session.user?.image && (
                    <img src={session.user.image} alt="avatar" className="w-9 h-9 rounded-full border-2 border-blue-400/30" />
                  )}
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{session.user?.name}</div>
                    <div className="text-xs" style={{ color: "var(--text-faint)" }}>{session.user?.email}</div>
                  </div>
                </div>
                <button onClick={() => signOut()} className="text-xs text-red-400 hover:text-red-300 transition-colors">Sign out</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Full Name *</label>
                    <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                      style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Email *</label>
                    <input required type="email" value={form.email} readOnly
                      className="w-full px-4 py-3 rounded-xl text-sm opacity-70 cursor-not-allowed"
                      style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Year *</label>
                    <select required value={form.year} onChange={e => setForm({...form, year: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                      style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}>
                      <option value="">Select year</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Branch *</label>
                    <input required type="text" value={form.branch} onChange={e => setForm({...form, branch: e.target.value})} placeholder="e.g. CSE, ECE, Mech"
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                      style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Preferred Division *</label>
                  <select required value={form.division} onChange={e => setForm({...form, division: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}>
                    <option value="">Select a division</option>
                    {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Why do you want to join? *</label>
                  <textarea required rows={4} value={form.why} onChange={e => setForm({...form, why: e.target.value})} placeholder="Tell us about your interest in space..."
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all resize-none"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold rounded-xl transition-all text-sm">
                  {loading ? "Submitting..." : "Submit Application 🚀"}
                </button>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
