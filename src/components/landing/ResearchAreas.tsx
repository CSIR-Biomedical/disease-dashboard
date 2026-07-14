import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ResearchAreaCard from "./ResearchAreaCard"
import parasitologyImg from "@/assets/parasitology_research_1783948072477.png"
import immunologyImg from "@/assets/immunology_research_1783948090027.png"
import pharmacologyImg from "@/assets/pharmacology_research_1783948099919.png"
import microbiologyImg from "@/assets/microbiology_research_1783948110096.png"

export default function ResearchAreas() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const areas = [
    {
      title: "Parasitology",
      description:
        "Investigating the biology, ecology, and transmission of parasitic diseases such as Malaria and Leishmaniasis to develop novel interventions.",
      imageSrc: parasitologyImg,
    },
    {
      title: "Immunology",
      description:
        "Understanding the immune system's response to pathogens and developing vaccines to combat emerging infectious threats.",
      imageSrc: immunologyImg,
    },
    {
      title: "Pharmacology",
      description:
        "Discovering and developing new therapeutic agents, assessing drug efficacy, and monitoring antimicrobial resistance.",
      imageSrc: pharmacologyImg,
    },
    {
      title: "Microbiology",
      description:
        "Studying the complex microbial ecosystems, pathogen evolution, and genomics to inform targeted public health responses.",
      imageSrc: microbiologyImg,
    },
  ]

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
    <section id="research" className="py-24 bg-[#faf9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-['Merriweather',serif] text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Core Research Areas
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Our institute focuses on four primary pillars of health research to ensure
            comprehensive disease surveillance and scientific discovery.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-1.5 bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-secondary transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(scrollProgress * 100, 8)}%` }}
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              disabled={!canScrollLeft}
              aria-label="Previous research area"
              className="w-10 h-10 rounded-full border border-secondary/30 text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              disabled={!canScrollRight}
              aria-label="Next research area"
              className="w-10 h-10 rounded-full border border-secondary/30 text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={updateProgress}
          className="flex overflow-x-auto gap-6 lg:gap-8 pb-12 pt-4 px-4 -mx-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {areas.map((area) => (
            <div
              key={area.title}
              className="flex-none w-[85vw] md:w-[45vw] lg:w-[38%] snap-center shrink-0"
            >
              <ResearchAreaCard
                title={area.title}
                description={area.description}
                imageSrc={area.imageSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
