"use client";
import { useState, useEffect, Suspense } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Calendar, MapPin, Clock, User, Mail, Phone, Building, Sparkles, CheckCircle, Briefcase, GraduationCap } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://spaceclub.onrender.com";

function RegisterForm() {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", regNumber: "", branch: "", year: "", division: "" });

  useEffect(() => {
    fetch(`${API}/api/admin/featured-event`).then(r => r.json()).then(d => setEvent(d)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/events/register`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, eventId: event?._id, eventTitle: event?.title }),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", regNumber: "", branch: "", year: "", division: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch { setError("Network error"); }
    setSubmitting(false);
  };

  if (loading) return <div className="min-h-screen section-bg flex items-center justify-center"><div className="text-blue-400">Loading...</div></div>;
  if (!event) return <div className="min-h-screen section-bg flex items-center justify-center px-4"><div className="glass rounded-2xl p-8 max-w-md text-center"><div className="text-4xl mb-4">📅</div><h2 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>No Event Available</h2><p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Check back soon!</p><a href="/events" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl">View Events</a></div></div>;
  if (success) return <div className="min-h-screen section-bg flex items-center justify-center px-4"><div className="glass rounded-2xl p-10 max-w-md text-center"><div className="w-16 h-16 bg-green-500/10 border-2 border-green-400/30 rounded-full flex items-center justify-center mx-auto mb-5"><CheckCircle size={32} className="text-green-400" /></div><h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>Success!</h2><p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>You are registered for <strong>{event.title}</strong>.</p><a href="/events" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl">Back to Events</a></div></div>;

  return (
    <div className="min-h-screen section-bg py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Registration" title="Register for Event" subtitle="Fill out the form below" />
        <div className="grid lg:grid-cols-5 gap-8 mt-12">
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4"><Sparkles size={18} className="text-orange-400" /><span className="text-sm font-bold text-orange-400">Featured Event</span></div>
              {event.image && <img src={event.image} alt={event.title} className="w-full h-auto rounded-xl mb-4 border border-white/10" style={{ maxHeight: "400px", objectFit: "contain" }} />}
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>{event.title}</h3>
              {event.description && <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{event.description}</p>}
              <div className="space-y-2.5 text-sm">
                {event.date && <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: "var(--bg-alt)" }}><Calendar size={16} className="text-blue-400" /><span style={{ color: "var(--text)" }}>{event.date}</span></div>}
                {event.time && <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: "var(--bg-alt)" }}><Clock size={16} className="text-blue-400" /><span style={{ color: "var(--text)" }}>{event.time}</span></div>}
                {event.location && <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: "var(--bg-alt)" }}><MapPin size={16} className="text-blue-400" /><span style={{ color: "var(--text)" }}>{event.location}</span></div>}
                {event.capacity && <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: "var(--bg-alt)" }}><Building size={16} className="text-blue-400" /><span style={{ color: "var(--text)" }}>{event.capacity}</span></div>}
                {event.registrationContact && <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: "var(--bg-alt)" }}><Phone size={16} className="text-green-400" /><span style={{ color: "var(--text)" }}>{event.registrationContact}</span></div>}
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-6" style={{ color: "var(--text)" }}>Your Information</h3>
              {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-400/30 rounded-xl"><p className="text-sm text-red-400">{error}</p></div>}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2"><label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}><User size={14} className="inline mr-1.5" /> Full Name *</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }} /></div>
                <div><label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}><Mail size={14} className="inline mr-1.5" /> Email *</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your.email@lpu.in" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }} /></div>
                <div><label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}><Phone size={14} className="inline mr-1.5" /> Phone *</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="10-digit number" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }} /></div>
                <div><label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}><Briefcase size={14} className="inline mr-1.5" /> Registration Number *</label><input type="text" required value={formData.regNumber} onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })} placeholder="e.g., 12345678" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }} /></div>
                <div><label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}><GraduationCap size={14} className="inline mr-1.5" /> Branch *</label><input type="text" required value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })} placeholder="e.g., CSE, ECE" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }} /></div>
                <div><label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>Year of Study *</label><select required value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}><option value="">Select Year</option><option value="1st Year">1st Year</option><option value="2nd Year">2nd Year</option><option value="3rd Year">3rd Year</option><option value="4th Year">4th Year</option></select></div>
                <div><label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>Division of Interest <span className="text-xs opacity-60">(Optional)</span></label><select value={formData.division} onChange={(e) => setFormData({ ...formData, division: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}><option value="">Select Division (Optional)</option><option value="Leadership">Leadership</option><option value="Aerospace">Aerospace</option><option value="Robotics">Robotics</option><option value="AI & Data">AI & Data</option><option value="Embedded Systems">Embedded Systems</option><option value="Software">Software</option><option value="Research">Research</option><option value="Astronomy">Astronomy</option><option value="Media & Design">Media & Design</option></select></div>
              </div>
              <div className="mt-8 flex gap-4">
                <button type="submit" disabled={submitting} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl">{submitting ? "Submitting..." : "Register for Event"}</button>
                <a href="/events" className="px-8 py-3.5 text-sm font-medium rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>Cancel</a>
              </div>
              <p className="text-xs mt-4 text-center" style={{ color: "var(--text-faint)" }}>By registering, you agree to receive event updates.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<div className="min-h-screen section-bg flex items-center justify-center"><div className="text-blue-400">Loading...</div></div>}><RegisterForm /></Suspense>;
}
