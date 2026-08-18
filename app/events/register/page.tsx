"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import { Calendar, MapPin, Clock, User, Mail, Phone, Building, Sparkles, CheckCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://spaceclub.onrender.com";

function RegisterForm() {
  const searchParams = useSearchParams();
  const event = { title: "National Space Day 2026", date: "Aug 21, 2026", time: "10:00 AM – 5:00 PM", location: "Room 30-603 & 604, LPU", image: "" };
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", regNumber: "", branch: "", year: "", division: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSuccess(true); setSubmitting(false); }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-screen section-bg flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-10 max-w-md text-center">
          <div className="w-16 h-16 bg-green-500/10 border-2 border-green-400/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>Registration Successful!</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>You are all set for {event.title}.</p>
          <a href="/events" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all">Back to Events</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-bg py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Event Registration" title="Register for Event" subtitle="Fill out the form below" />
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 mt-8">
          <div className="space-y-4">
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }} />
            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }} />
            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone" className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }} />
            <button type="submit" disabled={submitting} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl">{submitting ? "Submitting..." : "Register"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<div className="min-h-screen section-bg flex items-center justify-center"><div className="text-blue-400">Loading...</div></div>}><RegisterForm /></Suspense>;
}
