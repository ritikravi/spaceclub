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
        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full mb-3">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-gray-500 text-base sm:text-lg max-w-2xl ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
