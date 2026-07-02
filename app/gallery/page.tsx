import SectionHeading from "@/components/SectionHeading";
import StarField from "@/components/StarField";

const categories = ["All", "Events", "Astronomy", "Projects", "Hackathons", "Visits"];

const photos = [
  { id: 1, label: "CanSat Launch Day", category: "Projects", aspect: "aspect-square", color: "from-orange-900/50 to-orange-600/20" },
  { id: 2, label: "Saturn Observation Night", category: "Astronomy", aspect: "aspect-video", color: "from-purple-900/50 to-purple-600/20" },
  { id: 3, label: "NASA Space Apps Team", category: "Hackathons", aspect: "aspect-square", color: "from-blue-900/50 to-blue-600/20" },
  { id: 4, label: "ISRO Visit — VSSC", category: "Visits", aspect: "aspect-video", color: "from-green-900/50 to-green-600/20" },
  { id: 5, label: "Milky Way Photography", category: "Astronomy", aspect: "aspect-square", color: "from-indigo-900/50 to-indigo-600/20" },
  { id: 6, label: "CubeSat Workshop", category: "Events", aspect: "aspect-square", color: "from-cyan-900/50 to-cyan-600/20" },
  { id: 7, label: "Team during Space Camp", category: "Events", aspect: "aspect-video", color: "from-pink-900/50 to-pink-600/20" },
  { id: 8, label: "Embedded Systems Lab", category: "Projects", aspect: "aspect-square", color: "from-yellow-900/50 to-yellow-600/20" },
  { id: 9, label: "Rover Prototype Test", category: "Projects", aspect: "aspect-square", color: "from-red-900/50 to-red-600/20" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#050a14] pt-24">
      <section className="relative py-20 overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full mb-4">
            Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Moments We've <span className="gradient-text">Captured</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Events, missions, observations, and everything in between.
          </p>
        </div>
      </section>

      <section className="py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                c === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`${photo.aspect} rounded-2xl bg-gradient-to-br ${photo.color} border border-white/10 overflow-hidden relative group cursor-pointer`}
            >
              {/* Placeholder image — replace with <Image> from next/image in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-20">📷</div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <div className="text-white font-medium text-sm">{photo.label}</div>
                  <div className="text-slate-300 text-xs mt-0.5">{photo.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-600 text-sm mt-8">
          More photos are added after every event. Follow us on Instagram for live updates.
        </p>
      </section>
    </div>
  );
}
