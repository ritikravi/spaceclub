import SectionHeading from "@/components/SectionHeading";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Arjun Menon", role: "3rd Year, CSE", text: "Space Club pushed me to apply for NASA Space Apps. We made it to the global top 40.", avatar: "AM", color: "bg-blue-600" },
  { name: "Priya Nair", role: "2nd Year, ECE", text: "I built my first satellite component at a Space Camp. Best decision I made in college.", avatar: "PN", color: "bg-purple-600" },
  { name: "Rahul Krishnan", role: "4th Year, Aerospace", text: "Research Cell helped me publish my first paper in 3rd year. Incredible mentorship.", avatar: "RK", color: "bg-indigo-600" },
  { name: "Sneha Thomas", role: "2nd Year, Physics", text: "Astronomy Night changed everything. Now I lead the Astronomy Division.", avatar: "ST", color: "bg-teal-600" },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading tag="Testimonials" title="From Our Members" subtitle="Real stories from LPU students who've grown with the club." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="glass glass-hover rounded-xl p-6 flex flex-col">
              <div className="flex gap-0.5 mb-3">
                {Array(5).fill(0).map((_, i) => <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{t.avatar}</div>
                <div>
                  <div className="text-gray-800 text-sm font-semibold">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
