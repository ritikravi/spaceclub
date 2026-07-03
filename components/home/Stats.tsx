const stats = [
  { value: "500+", label: "Students" },
  { value: "40+", label: "Workshops" },
  { value: "20+", label: "Projects" },
  { value: "15+", label: "Competitions" },
  { value: "10+", label: "Research Papers" },
  { value: "5+", label: "Industry Partners" },
];

export default function Stats() {
  return (
    <section className="py-16 border-y border-[var(--border)]" style={{ background: "var(--bg)" }}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold gradient-text-blue mb-1">{s.value}</div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
