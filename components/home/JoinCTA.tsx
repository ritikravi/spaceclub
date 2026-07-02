import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import StarField from "@/components/StarField";

export default function JoinCTA() {
  return (
    <section className="relative py-24 section-bg overflow-hidden">
      <StarField />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-16 h-16 bg-blue-500/10 border border-blue-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Rocket size={28} className="text-blue-400" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-5" style={{ color: "var(--text)" }}>
          Ready to{" "}
          <span className="gradient-text">Launch Your Journey?</span>
        </h2>
        <p className="text-base sm:text-lg mb-10 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
          Join hundreds of students building, researching, competing, and innovating in space technology.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/join" className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all text-sm">
            Join Space Club <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="flex items-center gap-2 px-8 py-4 border font-medium rounded-xl transition-all text-sm" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            Talk to Us
          </Link>
        </div>
      </div>
    </section>
  );
}
