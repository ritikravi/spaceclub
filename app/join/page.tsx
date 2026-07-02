"use client";
import { useState } from "react";
import StarField from "@/components/StarField";
import { CheckCircle, Rocket, Star, Crown } from "lucide-react";

const tiers = [
  {
    icon: Rocket,
    title: "Cosmos Member",
    tier: "Tier 1",
    price: "Free",
    color: "border-blue-400/30",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10",
    badge: "text-blue-400 bg-blue-400/10",
    perks: [
      "Access to all public events",
      "Weekly webinar invites",
      "Discord community access",
      "Learning resources library",
      "Monthly newsletter",
    ],
  },
  {
    icon: Star,
    title: "Space Club Member",
    tier: "Tier 2",
    price: "₹500/year",
    color: "border-purple-400/30",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-400/10",
    badge: "text-purple-400 bg-purple-400/10",
    popular: true,
    perks: [
      "Everything in Tier 1",
      "Division membership",
      "Project participation",
      "Hackathon team priority",
      "Club ID card & certificate",
      "Space Camp discounts",
    ],
  },
  {
    icon: Crown,
    title: "Core Fellow",
    tier: "Tier 3",
    price: "By invitation",
    color: "border-orange-400/30",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-400/10",
    badge: "text-orange-400 bg-orange-400/10",
    perks: [
      "Everything in Tier 2",
      "Core team leadership roles",
      "ISRO visit priority",
      "Research mentorship",
      "Industry connections",
      "Letter of recommendation",
    ],
  },
];

const divisions = [
  "Aerospace", "Robotics", "AI & Data", "Embedded Systems",
  "Software", "Research", "Astronomy", "Media & Design",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "PG / PhD"];

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", year: "", branch: "", division: "", why: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050a14] pt-24">
      <section className="relative py-20 overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">
            Membership
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Join Space<span className="gradient-text">Club</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Start as a Cosmos Member. Work your way up through involvement, projects, and contribution.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {tiers.map((t) => (
            <div
              key={t.title}
              className={`glass rounded-2xl p-7 border ${t.color} relative ${t.popular ? "ring-1 ring-purple-400/50" : ""}`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className={`w-12 h-12 ${t.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <t.icon size={22} className={t.iconColor} />
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.badge}`}>{t.tier}</span>
              <h3 className="text-white font-bold text-xl mt-2 mb-1">{t.title}</h3>
              <div className="text-2xl font-extrabold text-white mb-5">{t.price}</div>
              <ul className="space-y-2">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle size={14} className="text-green-400 mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Registration form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Register Now</h2>
            <p className="text-slate-400 text-sm">Fill in the form and we'll confirm your membership within 48 hours.</p>
          </div>

          {submitted ? (
            <div className="glass rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-white font-bold text-2xl mb-2">You're In!</h3>
              <p className="text-slate-400">
                We've received your application. You'll get a confirmation email within 48 hours with next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-300 text-sm mb-1.5" htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="Your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-400/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1.5" htmlFor="email">College Email *</label>
                  <input
                    id="email"
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    placeholder="your@college.edu"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-400/50 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-300 text-sm mb-1.5" htmlFor="year">Year *</label>
                  <select
                    id="year"
                    required
                    value={form.year}
                    onChange={e => setForm({...form, year: e.target.value})}
                    className="w-full bg-[#0a1628] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400/50 transition-all"
                  >
                    <option value="">Select year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1.5" htmlFor="branch">Branch / Department *</label>
                  <input
                    id="branch"
                    required
                    type="text"
                    value={form.branch}
                    onChange={e => setForm({...form, branch: e.target.value})}
                    placeholder="e.g. CSE, ECE, Mech"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-400/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-1.5" htmlFor="division">Preferred Division *</label>
                <select
                  id="division"
                  required
                  value={form.division}
                  onChange={e => setForm({...form, division: e.target.value})}
                  className="w-full bg-[#0a1628] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400/50 transition-all"
                >
                  <option value="">Select a division</option>
                  {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-1.5" htmlFor="why">Why do you want to join? *</label>
                <textarea
                  id="why"
                  required
                  rows={4}
                  value={form.why}
                  onChange={e => setForm({...form, why: e.target.value})}
                  placeholder="Tell us about your interest in space, what you want to learn, or build..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-400/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all text-sm"
              >
                Submit Application 🚀
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
