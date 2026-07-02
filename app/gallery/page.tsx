const categories = ["All", "Events", "Astronomy", "Projects", "Hackathons", "Visits"];

const photos = [
  { id: 1, label: "CanSat Launch Day", category: "Projects", aspect: "aspect-square", color: "from-orange-100 to-orange-200" },
  { id: 2, label: "Saturn Observation Night", category: "Astronomy", aspect: "aspect-video", color: "from-purple-100 to-purple-200" },
  { id: 3, label: "NASA Space Apps Team", category: "Hackathons", aspect: "aspect-square", color: "from-blue-100 to-blue-200" },
  { id: 4, label: "ISRO Visit — VSSC", category: "Visits", aspect: "aspect-video", color: "from-green-100 to-green-200" },
  { id: 5, label: "Milky Way Photography", category: "Astronomy", aspect: "aspect-square", color: "from-indigo-100 to-indigo-200" },
  { id: 6, label: "CubeSat Workshop", category: "Events", aspect: "aspect-square", color: "from-cyan-100 to-cyan-200" },
  { id: 7, label: "Team during Space Camp", category: "Events", aspect: "aspect-video", color: "from-pink-100 to-pink-200" },
  { id: 8, label: "Embedded Systems Lab", category: "Projects", aspect: "aspect-square", color: "from-yellow-100 to-yellow-200" },
  { id: 9, label: "Rover Prototype Test", category: "Projects", aspect: "aspect-square", color: "from-red-100 to-red-200" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-blue-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-200 bg-white/10 rounded-full mb-4">Gallery</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Moments We've Captured</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">Events, missions, observations, and everything in between.</p>
        </div>
      </section>

      <section className="py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((c) => (
            <button key={c}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${c === "All" ? "bg-blue-700 text-white shadow-sm" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className={`${photo.aspect} rounded-2xl bg-gradient-to-br ${photo.color} border border-gray-200 overflow-hidden relative group cursor-pointer`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-30">📷</div>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <div className="text-white font-semibold text-sm">{photo.label}</div>
                  <div className="text-gray-200 text-xs mt-0.5">{photo.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">
          More photos added after every event. Follow us on Instagram for live updates.
        </p>
      </section>
    </div>
  );
}
