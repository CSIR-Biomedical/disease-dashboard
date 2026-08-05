const STATS = [
  { value: "42+", label: "Active Projects" },
  { value: "120", label: "Publications (2024)" },
  { value: "16", label: "Partner Districts" },
  { value: "2.4M", label: "Data Points Tracked" },
]

export default function StatsStrip() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-slate-200">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center md:px-6">
              <div className="font-['Merriweather',serif] text-2xl md:text-3xl font-bold text-secondary">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
