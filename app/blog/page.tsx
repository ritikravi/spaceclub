import SectionHeading from "@/components/SectionHeading";
import StarField from "@/components/StarField";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "how-cubesats-work",
    title: "How CubeSats Work — A Student's Guide",
    excerpt: "CubeSats have democratized space access. Here's a complete breakdown of how a 1U CubeSat is designed, from power to comms to payload.",
    author: "Kiran Das",
    role: "Technical Lead",
    date: "Dec 20, 2024",
    readTime: "8 min",
    category: "Aerospace",
    categoryColor: "text-orange-400 bg-orange-400/10",
    featured: true,
  },
  {
    slug: "isro-space-apps-prep",
    title: "How We Prepared for NASA Space Apps — and Reached Global Top 40",
    excerpt: "Our team's full story: the sleepless nights, the pivot moments, and the strategy that got us shortlisted globally.",
    author: "Aditya Sharma",
    role: "President",
    date: "Dec 10, 2024",
    readTime: "10 min",
    category: "Hackathon",
    categoryColor: "text-yellow-400 bg-yellow-400/10",
    featured: true,
  },
  {
    slug: "gee-beginners-guide",
    title: "Getting Started with Google Earth Engine for Beginners",
    excerpt: "A practical intro to using GEE for satellite data analysis — from NDVI to flood mapping. No prior GIS experience needed.",
    author: "Ananya Menon",
    role: "Research Lead",
    date: "Dec 1, 2024",
    readTime: "7 min",
    category: "AI & GIS",
    categoryColor: "text-purple-400 bg-purple-400/10",
    featured: false,
  },
  {
    slug: "astronomy-photography-basics",
    title: "Astrophotography on a Budget — What Works",
    excerpt: "You don't need a ₹50,000 setup to photograph the Milky Way. Here's what we use and how to get started with what you have.",
    author: "Sneha Thomas",
    role: "Astronomy Division",
    date: "Nov 22, 2024",
    readTime: "6 min",
    category: "Astronomy",
    categoryColor: "text-blue-400 bg-blue-400/10",
    featured: false,
  },
  {
    slug: "publish-first-paper",
    title: "How to Publish Your First Research Paper as an Undergrad",
    excerpt: "A step-by-step guide from choosing a topic to submitting to IEEE — written by students who've done it.",
    author: "Ananya Menon",
    role: "Research Lead",
    date: "Nov 15, 2024",
    readTime: "12 min",
    category: "Research",
    categoryColor: "text-pink-400 bg-pink-400/10",
    featured: false,
  },
  {
    slug: "cansat-launch-recap",
    title: "CanSat 2024 Launch Day — Full Recap",
    excerpt: "We launched. We recovered. We collected data. Here's everything that happened on launch day and what we learned.",
    author: "Meera Pillai",
    role: "Vice President",
    date: "Nov 5, 2024",
    readTime: "5 min",
    category: "Mission",
    categoryColor: "text-green-400 bg-green-400/10",
    featured: false,
  },
];

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-[#050a14]">
      <section className="relative py-20 overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Stories, Guides & <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Written by members, for the space community. Technical articles, mission recaps, and career guidance.
          </p>
        </div>
      </section>

      <section className="py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featured.map((post) => (
            <article key={post.slug} className="glass glass-hover rounded-2xl p-8 border border-blue-400/10">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.categoryColor}`}>
                  {post.category}
                </span>
                <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">Featured</span>
              </div>
              <h2 className="text-white font-bold text-xl mb-3 leading-snug">{post.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {post.author.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <div className="text-white text-xs font-medium">{post.author}</div>
                    <div className="text-slate-500 text-xs">{post.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-xs">
                  <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-white/5">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Read article <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Rest */}
        <SectionHeading tag="Latest" title="More Articles" center={false} />
        <div className="space-y-4">
          {rest.map((post) => (
            <article key={post.slug} className="glass glass-hover rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>
                <h2 className="text-white font-semibold mb-1">{post.title}</h2>
                <p className="text-slate-400 text-sm">{post.excerpt}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-3 justify-end">
                  <Calendar size={10} /> {post.date} · {post.readTime}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Read <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
