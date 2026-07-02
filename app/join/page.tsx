"use client";
import { useState } from "react";
import { CheckCircle, Rocket, Star, Crown } from "lucide-react";
import { submitJoinForm } from "@/lib/api";

const tiers = [
  { icon: Rocket, title: "Cosmos Member", tier: "Tier 1", price: "Free", border: "border-t-4 border-blue-400", iconBg: "bg-blue-50", iconColor: "text-blue-500", badge: "text-blue-600 bg-blue-100", perks: ["Access to all public events", "Weekly webinar invites", "Discord community access", "Learning resources library", "Monthly newsletter"] },
  { icon: Star, title: "Space Club Member", tier: "Tier 2", price: "₹500/year", border: "border-t-4 border-blue-400", iconBg: "bg-blue-50", iconColor: "text-blue-700", badge: "text-blue-700 bg-blue-50", popular: true, perks: ["Everything in Tier 1", "Division membership", "Project participation", "Hackathon team priority", "Club ID card & certificate", "Space Camp discounts"] },
  { icon: Crown, title: "Core Fellow", tier: "Tier 3", price: "By invitation", border: "border-t-4 border-purple-400", iconBg: "bg-purple-50", iconColor: "text-purple-500", badge: "text-purple-600 bg-purple-100", perks: ["Everything in Tier 2", "Core team leadership roles", "ISRO visit priority", "Research mentorship", "Industry connections", "Letter of recommendation"] },
];

const divisions = ["Aerospace", "Robotics", "AI & Data", "Embedded Systems", "Software", "Research", "Astronomy", "Media & Design"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "PG / PhD"];

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", year: "", branch: "", division: "", why: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try { await submitJoinForm(form); setSubmitted(true); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-blue-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-200 bg-white/10 rounded-full mb-4">Membership</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Join SpaceClub LPU</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">Start as a Cosmos Member. Work your way up through involvement and contribution.</p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {tiers.map((t) => (
            <div key={t.title} className={`glass rounded-2xl p-7 ${t.border} relative ${t.popular ? "ring-2 ring-blue-500 shadow-lg" : ""}`}>
              {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-700 text-white text-xs font-bold rounded-full">Most Popular</div>}
              <div className={`w-12 h-12 ${t.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <t.icon size={22} className={t.iconColor} />
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${t.badge}`}>{t.tier}</span>
              <h3 className="text-gray-900 font-bold text-xl mt-2 mb-1">{t.title}</h3>
              <div className="text-2xl font-extrabold text-gray-900 mb-5">{t.price}</div>
              <ul className="space-y-2">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-gray-600 text-sm">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Register Now</h2>
            <p className="text-gray-400 text-sm">Fill in the form and we'll confirm your membership within 48 hours.</p>
          </div>
          {submitted ? (
            <div className="glass rounded-2xl p-10 text-center border-t-4 border-blue-400">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-gray-900 font-bold text-2xl mb-2">You're In!</h3>
              <p className="text-gray-500">We've received your application. You'll get a confirmation email within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5 border-t-4 border-blue-400">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5" htmlFor="name">Full Name *</label>
                  <input id="name" required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5" htmlFor="email">College Email *</label>
                  <input id="email" required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@lpu.in" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5" htmlFor="year">Year *</label>
                  <select id="year" required value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-blue-400 transition-all">
                    <option value="">Select year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5" htmlFor="branch">Branch *</label>
                  <input id="branch" required type="text" value={form.branch} onChange={e => setForm({...form, branch: e.target.value})} placeholder="e.g. CSE, ECE, Mech" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5" htmlFor="division">Preferred Division *</label>
                <select id="division" required value={form.division} onChange={e => setForm({...form, division: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-blue-400 transition-all">
                  <option value="">Select a division</option>
                  {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5" htmlFor="why">Why do you want to join? *</label>
                <textarea id="why" required rows={4} value={form.why} onChange={e => setForm({...form, why: e.target.value})} placeholder="Tell us about your interest in space..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-bold rounded-xl transition-all text-sm shadow-sm">
                {loading ? "Submitting..." : "Submit Application 🚀"}
              </button>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
