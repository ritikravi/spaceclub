import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JoinCTA() {
  return (
    <section className="py-20 bg-blue-700">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-4xl mb-4">🚀</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to Launch Your Journey?
        </h2>
        <p className="text-blue-200 text-base mb-8">
          Join hundreds of LPU students building, researching, and competing in space technology.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/join" className="flex items-center gap-2 px-7 py-3 bg-white hover:bg-blue-50 text-blue-700 font-bold rounded-xl transition-all text-sm shadow-md">
            Join Space Club <ArrowRight size={15} />
          </Link>
          <Link href="/contact" className="flex items-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-500 border border-blue-500 text-white font-semibold rounded-xl transition-all text-sm">
            Talk to Us
          </Link>
        </div>
      </div>
    </section>
  );
}
