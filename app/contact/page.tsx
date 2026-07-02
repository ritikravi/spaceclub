"use client";
import { useState } from "react";
import StarField from "@/components/StarField";
import { Mail, MapPin, GitBranch, Camera, Link2, MessageCircle, Send } from "lucide-react";
import { submitContactForm } from "@/lib/api";

const contacts = [
  { icon: Mail, label: "Email", value: "spaceclub@college.edu", href: "mailto:spaceclub@college.edu" },
  { icon: MapPin, label: "Location", value: "Department of Aerospace, Main Block", href: "#" },
  { icon: Camera, label: "Instagram", value: "@spaceclub.college", href: "#" },
  { icon: Link2, label: "LinkedIn", value: "Space Club — College Name", href: "#" },
  { icon: GitBranch, label: "GitHub", value: "github.com/spaceclub", href: "#" },
  { icon: MessageCircle, label: "Discord", value: "Join our server", href: "#" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitContactForm(form);
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050a14] pt-24">
      <section className="relative py-20 overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Questions, collaborations, mentorship — we're open to all of it. Reach out anytime.
          </p>
        </div>
      </section>

      <section className="py-12 pb-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-white font-bold text-xl mb-6">Find Us Here</h2>
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 glass rounded-xl p-4 glass-hover group"
              >
                <div className="w-10 h-10 bg-blue-400/10 rounded-lg flex items-center justify-center group-hover:bg-blue-400/20 transition-all">
                  <c.icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs">{c.label}</div>
                  <div className="text-white text-sm font-medium">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="text-white font-bold text-xl mb-6">Send a Message</h2>
            {sent ? (
              <div className="glass rounded-2xl p-10 text-center">
                <div className="text-4xl mb-3">📨</div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm">We'll get back to you within 24–48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-300 text-sm mb-1.5" htmlFor="c-name">Name *</label>
                    <input
                      id="c-name"
                      required
                      type="text"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-400/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm mb-1.5" htmlFor="c-email">Email *</label>
                    <input
                      id="c-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-400/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1.5" htmlFor="c-subject">Subject *</label>
                  <input
                    id="c-subject"
                    required
                    type="text"
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    placeholder="What's this about?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-400/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1.5" htmlFor="c-message">Message *</label>
                  <textarea
                    id="c-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Write your message here..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-400/50 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-all text-sm"
                >
                  <Send size={16} /> {loading ? "Sending..." : "Send Message"}
                </button>
                {error && <p className="text-red-400 text-sm">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
