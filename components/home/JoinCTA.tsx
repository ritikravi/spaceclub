import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export default function JoinCTA() {
  return (
    <section className="py-24 bg-orange-500">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Rocket size={28} className="text-white" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5">
          Ready to Launch Your Journey?
        </h2>
        <p className="text-orange-100 text-base sm:text-lg mb-10 max-w-xl mx-auto">
          Join hundreds of LPU students who are building, researching, competing, and innovating in space technology.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/join" className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-orange-50 text-orange-600 font-bold rounded-xl transition-all text-sm shadow-lg">
            Join Space Club <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="flex items-center gap-2 px-8 py-4 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded-xl transition-all text-sm">
            Talk to Us
          </Link>
        </div>
      </div>
    </section>
  );
}
