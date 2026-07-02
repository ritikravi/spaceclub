import SectionHeading from "@/components/SectionHeading";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Arjun Menon", role: "3rd Year, CSE — LPU", text: "The Space Club pushed me to apply for NASA Space Apps. We made it to the global top 40. That would've never happened without the prep sessions here.", avatar: "AM", color: "bg-orange-500" },
  { name: "Priya Nair", role: "2nd Year, ECE — LPU", text: "I built my first satellite component at a Space Camp. The mentors are pros and the environment is super collaborative. Best decision I made in college.", avatar: "PN", color: "bg-purple-500" },
  { name: "Rahul Krishnan", role: "4th Year, Aerospace — LPU", text: "Research Cell helped me publish my first paper in 3rd year. The club connected me to a mentor who guided me through the entire process.", avatar: "RK", color: "bg-blue-500" },
  { name: "Sneha Thomas", role: "2nd Year, Physics — LPU", text: "Astronomy Night changed everything. I fell in love with astrophotography and now I lead the Astronomy Division. Started from zero, learned everything here.", avatar: "ST", color: "bg-green-500" },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Testimonials" title="From Our Members" subtitle="Real stories from LPU students who've grown with the club." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass glass-hover rounded-2xl p-6 flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-gray-900 text-sm font-semibold">{t.name}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
