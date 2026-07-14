import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import parasitologyImg from "@/assets/parasitology_research_1783948072477.png"
import immunologyImg from "@/assets/immunology_research_1783948090027.png"
import pharmacologyImg from "@/assets/pharmacology_research_1783948099919.png"

export default function LatestNews() {
  const newsItems = [
    {
      title: "CSIR Center Discovers Novel Biomarker for Early Malaria Detection",
      date: "August 12, 2026",
      category: "Press Release",
      image: parasitologyImg,
      summary:
        "New diagnostic marker shows promise for earlier detection in district-level screening programs.",
    },
    {
      title: "Annual Global Health Summit Highlights CSIR's Genomic Surveillance Expansion",
      date: "July 24, 2026",
      category: "Article",
      image: immunologyImg,
      summary:
        "Expanded sequencing capacity strengthens regional preparedness for emerging pathogens.",
    },
    {
      title: "New Partnership Announced with Ministry of Health for Vaccination Drive Data",
      date: "July 05, 2026",
      category: "Update",
      image: pharmacologyImg,
      summary:
        "Shared data infrastructure will support coverage tracking and equitable vaccine delivery.",
    },
  ]

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-['Merriweather',serif] text-3xl md:text-4xl font-bold text-secondary mb-4">
              Latest News & Publications
            </h2>
            <div className="w-20 h-1 bg-primary" />
          </div>
          <Link to="/publications" className="hidden md:flex items-center text-primary font-semibold hover:underline">
            View All News <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.title} className="group cursor-pointer flex flex-col">
              <div className="overflow-hidden rounded-md mb-5 aspect-[16/10] bg-slate-100">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400">|</span>
                <time className="text-xs font-medium text-slate-500">{item.date}</time>
              </div>
              <h3 className="font-['Merriweather',serif] text-lg font-bold text-secondary leading-snug mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">{item.summary}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                Read more <ArrowRight className="ml-1.5 w-4 h-4" />
              </span>
            </article>
          ))}
        </div>

        <div className="mt-8 md:hidden text-center">
          <Link to="/publications" className="inline-flex items-center text-primary font-semibold hover:underline">
            View All News <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
