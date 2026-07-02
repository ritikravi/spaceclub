interface Props {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({ tag, title, subtitle, center = true }: Props) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {tag && (
        <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-slate-400 text-base sm:text-lg max-w-2xl ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
