"use client";
import { useState } from "react";
import { Mail, MapPin, GitBranch, Camera, Link2, MessageCircle, Send } from "lucide-react";
import { submitContactForm } from "@/lib/api";

const contacts = [
  { icon: Mail, label: "Email", value: "spaceclub@lpu.in", href: "mailto:spaceclub@lpu.in" },
  { icon: MapPin, label: "Location", value: "Block 32, LPU Campus, Phagwara", href: "#" },
  { icon: Camera, label: "Instagram", value: "@spaceclub.lpu", href: "#" },
  { icon: Link2, label: "LinkedIn", value: "Space Club — LPU", href: "#" },
  { icon: GitBranch, label: "GitHub", value: "github.com/spaceclub-lpu", href: "#" },
  { icon: MessageCircle, label: "Discord", value: "Join our server", href: "#" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try { await submitContactForm(form); setSent(true); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-200 bg-white/20 rounded-full mb-4">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Get in Touch</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Questions, collaborations, mentorship — reach out anytime.</p>
        </div>
      </section>

      <section className="py-16 pb-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-gray-900 font-bold text-xl mb-6">Find Us Here</h2>
            {contacts.map((c) => (
              <a key={c.label} href={c.href} className="flex items-center gap-4 glass glass-hover rounded-xl p-4 group">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-all">
                  <c.icon size={18} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs">{c.label}</div>
                  <div className="text-gray-800 text-sm font-medium">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-gray-900 font-bold text-xl mb-6">Send a Message</h2>
            {sent ? (
              <div className="glass rounded-2xl p-10 text-center border-t-4 border-orange-400">
                <div className="text-4xl mb-3">📨</div>
                <h3 className="text-gray-900 font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">We'll get back to you within 24–48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5 border-t-4 border-orange-400">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5" htmlFor="c-name">Name *</label>
                    <input id="c-name" required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5" htmlFor="c-email">Email *</label>
                    <input id="c-email" required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5" htmlFor="c-subject">Subject *</label>
                  <input id="c-subject" required type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="What's this about?" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5" htmlFor="c-message">Message *</label>
                  <textarea id="c-message" required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Write your message here..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all resize-none" />
                </div>
                <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold rounded-xl transition-all text-sm shadow-sm">
                  <Send size={16} /> {loading ? "Sending..." : "Send Message"}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
