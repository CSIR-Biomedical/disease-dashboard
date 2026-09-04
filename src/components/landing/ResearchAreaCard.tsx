import { useState } from "react"
import { ArrowLeft } from "lucide-react"

interface ResearchAreaCardProps {
  title: string
  description: string
  imageSrc: string
}

export default function ResearchAreaCard({
  title,
  description,
  imageSrc,
}: ResearchAreaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="group w-full cursor-pointer [perspective:1000px] h-[400px] lg:h-[450px]"
      onClick={() => setIsFlipped((f) => !f)}
    >
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden bg-[#1a153a]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a153a] via-[#1a153a]/40 to-transparent z-10 pointer-events-none" />
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 p-7 z-20 flex justify-between items-end gap-4">
            <h3 className="font-['Merriweather',serif] text-2xl md:text-3xl font-bold text-white">
              {title}
            </h3>
            <span className="text-xs font-medium uppercase tracking-wider text-white/70 shrink-0">
              Details
            </span>
          </div>
        </div>

        {/* Back — solid white; arrow only re-flips */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden flex flex-col bg-white border border-[#e0e0e0]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-1 flex-col justify-center p-8">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-3">
              Research area
            </p>
            <h3 className="font-['Merriweather',serif] text-2xl md:text-3xl font-bold text-secondary mb-5">
              {title}
            </h3>
            <p className="text-secondary/80 leading-relaxed text-base">
              {description}
            </p>
          </div>
          <div className="px-8 pb-8">
            <button
              type="button"
              aria-label="Flip card back"
              className="inline-flex items-center justify-center w-10 h-10 rounded-none border border-secondary/25 text-secondary hover:bg-secondary hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(false)
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
