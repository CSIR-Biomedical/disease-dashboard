import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ResearchAreaCard from "./ResearchAreaCard"
import { RESEARCH_AREAS } from "@/data/researchAreas"

export default function ResearchAreas() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const updateProgress = () => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0)
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < maxScroll - 4)
  }

  const scrollByCard = (direction: "prev" | "next") => {
    const el = scrollRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    updateProgress()
  }, [])

  return (
    <section id="research" className="py-20 md:py-24 bg-[#f7f6f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              Research
            </p>
            <h2 className="font-['Merriweather',serif] text-3xl md:text-4xl font-bold text-secondary mb-4">
              Core research areas
            </h2>
            <div className="w-16 h-0.5 bg-primary mb-5" />
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Four pillars of health research spanning surveillance, discovery, and scientific
              response across the region.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/research"
              className="hidden sm:inline-flex text-sm font-semibold text-secondary underline-offset-4 hover:underline hover:text-primary mr-2"
            >
              View all areas
            </Link>
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              disabled={!canScrollLeft}
              aria-label="Previous research area"
              className="w-11 h-11 rounded-sm border border-secondary/25 text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              disabled={!canScrollRight}
              aria-label="Next research area"
              className="w-11 h-11 rounded-sm border border-secondary/25 text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="h-0.5 bg-slate-200 mb-10 overflow-hidden">
          <div
            className="h-full bg-secondary transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(scrollProgress * 100, 8)}%` }}
          />
        </div>

        <div
          ref={scrollRef}
          onScroll={updateProgress}
          className="flex overflow-x-auto gap-6 lg:gap-8 pb-12 pt-4 px-4 -mx-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {RESEARCH_AREAS.map((area) => (
            <div
              key={area.id}
              className="flex-none w-[85vw] md:w-[45vw] lg:w-[38%] snap-center shrink-0"
            >
              <ResearchAreaCard
                title={area.title}
                description={area.description}
                imageSrc={area.imageSrc}
                href={`/research#${area.id}`}
              />
            </div>
          ))}
        </div>

        <div className="sm:hidden -mt-4">
          <Link
            to="/research"
            className="inline-flex text-sm font-semibold text-secondary underline-offset-4 hover:underline"
          >
            View all research areas
          </Link>
        </div>
      </div>
    </section>
  )
}
