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
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              Updates
            </p>
            <h2 className="font-['Merriweather',serif] text-3xl md:text-4xl font-bold text-secondary mb-4">
              Latest news & publications
            </h2>
            <div className="w-16 h-0.5 bg-primary" />
          </div>
          <Link
            to="/publications"
            className="hidden md:inline-flex items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline hover:text-primary shrink-0"
          >
            View all <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {newsItems.map((item) => (
            <article key={item.title} className="group cursor-pointer flex flex-col">
              <div className="overflow-hidden mb-5 aspect-[16/10] bg-slate-100">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {item.category}
                </span>
                <span className="text-xs text-slate-300">·</span>
                <time className="text-xs font-medium text-slate-500">{item.date}</time>
              </div>
              <h3 className="font-['Merriweather',serif] text-lg font-bold text-secondary leading-snug mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">{item.summary}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary underline-offset-4 group-hover:underline">
                Read more <ArrowRight className="ml-1.5 w-4 h-4" />
              </span>
            </article>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link
            to="/publications"
            className="inline-flex items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline"
          >
            View all <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
