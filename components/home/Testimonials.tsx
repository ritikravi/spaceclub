import SectionHeading from "@/components/SectionHeading";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Arjun Menon", role: "3rd Year, CSE", text: "The Space Club pushed me to apply for NASA Space Apps. We made it to the global top 40.", avatar: "AM", color: "bg-blue-500" },
  { name: "Priya Nair", role: "2nd Year, ECE", text: "I built my first satellite component at a Space Camp. Best decision I made in college.", avatar: "PN", color: "bg-purple-500" },
  { name: "Rahul Krishnan", role: "4th Year, Aerospace", text: "Research Cell helped me publish my first paper in 3rd year. Incredible mentorship.", avatar: "RK", color: "bg-pink-500" },
  { name: "Sneha Thomas", role: "2nd Year, Physics", text: "Astronomy Night changed everything. Now I lead the Astronomy Division.", avatar: "ST", color: "bg-orange-500" },
];

export default function Testimonials() {
  return (
    <section className="py-24 section-bg-alt">
      <div className="w-full px-6 lg:px-12">
        <SectionHeading tag="Testimonials" title="From Our Members" subtitle="Real stories from students who've grown with the club." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass glass-hover rounded-2xl p-6 flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--text-muted)" }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{t.avatar}</div>
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--text-faint)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
