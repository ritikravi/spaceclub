import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
  { slug: "how-cubesats-work", title: "How CubeSats Work — A Student's Guide", excerpt: "CubeSats have democratized space access. Here's a complete breakdown of how a 1U CubeSat is designed, from power to comms to payload.", author: "Kiran Das", role: "Technical Lead", date: "Dec 20, 2024", readTime: "8 min", category: "Aerospace", categoryColor: "text-orange-600 bg-orange-100", featured: true },
  { slug: "isro-space-apps-prep", title: "How We Prepared for NASA Space Apps — and Reached Global Top 40", excerpt: "Our team's full story: the sleepless nights, the pivot moments, and the strategy that got us shortlisted globally.", author: "Aditya Sharma", role: "President", date: "Dec 10, 2024", readTime: "10 min", category: "Hackathon", categoryColor: "text-yellow-600 bg-yellow-100", featured: true },
  { slug: "gee-beginners-guide", title: "Getting Started with Google Earth Engine for Beginners", excerpt: "A practical intro to using GEE for satellite data analysis — from NDVI to flood mapping. No prior GIS experience needed.", author: "Ananya Menon", role: "Research Lead", date: "Dec 1, 2024", readTime: "7 min", category: "AI & GIS", categoryColor: "text-purple-600 bg-purple-100", featured: false },
  { slug: "astronomy-photography-basics", title: "Astrophotography on a Budget — What Works", excerpt: "You don't need a ₹50,000 setup to photograph the Milky Way. Here's what we use and how to get started.", author: "Sneha Thomas", role: "Astronomy Division", date: "Nov 22, 2024", readTime: "6 min", category: "Astronomy", categoryColor: "text-blue-600 bg-blue-100", featured: false },
  { slug: "publish-first-paper", title: "How to Publish Your First Research Paper as an Undergrad", excerpt: "A step-by-step guide from choosing a topic to submitting to IEEE — written by students who've done it.", author: "Ananya Menon", role: "Research Lead", date: "Nov 15, 2024", readTime: "12 min", category: "Research", categoryColor: "text-pink-600 bg-pink-100", featured: false },
  { slug: "cansat-launch-recap", title: "CanSat 2024 Launch Day — Full Recap", excerpt: "We launched. We recovered. We collected data. Here's everything that happened on launch day and what we learned.", author: "Meera Pillai", role: "Vice President", date: "Nov 5, 2024", readTime: "5 min", category: "Mission", categoryColor: "text-green-600 bg-green-100", featured: false },
];

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-200 bg-white/20 rounded-full mb-4">Blog</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Stories, Guides & Insights</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Written by members. Technical articles, mission recaps, and career guidance.</p>
        </div>
      </section>

      <section className="py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featured.map((post) => (
            <article key={post.slug} className="glass glass-hover rounded-2xl p-8 border-t-4 border-orange-400">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${post.categoryColor}`}>{post.category}</span>
                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full font-semibold">Featured</span>
              </div>
              <h2 className="text-gray-900 font-bold text-xl mb-3 leading-snug">{post.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {post.author.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <div className="text-gray-800 text-xs font-semibold">{post.author}</div>
                    <div className="text-gray-400 text-xs">{post.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-xs">
                  <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 text-sm font-semibold transition-colors">
                  Read article <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <SectionHeading tag="Latest" title="More Articles" center={false} />
        <div className="space-y-4">
          {rest.map((post) => (
            <article key={post.slug} className="glass glass-hover rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${post.categoryColor}`}>{post.category}</span>
                </div>
                <h2 className="text-gray-900 font-semibold mb-1">{post.title}</h2>
                <p className="text-gray-500 text-sm">{post.excerpt}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 justify-end">
                  <Calendar size={10} /> {post.date} · {post.readTime}
                </div>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 text-sm font-semibold transition-colors">
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
