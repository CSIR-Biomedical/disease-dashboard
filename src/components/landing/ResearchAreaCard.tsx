import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "lucide-react"

interface ResearchAreaCardProps {
  title: string
  description: string
  imageSrc: string
  href?: string
}

export default function ResearchAreaCard({
  title,
  description,
  imageSrc,
  href = "/research",
}: ResearchAreaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      className="group w-full cursor-pointer [perspective:1000px] h-[400px] lg:h-[450px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
      >
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] overflow-hidden bg-[#1a153a]">
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

        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden flex flex-col justify-center p-8 bg-white border border-slate-200">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-3">
            Research area
          </p>
          <h3 className="font-['Merriweather',serif] text-2xl md:text-3xl font-bold text-secondary mb-5">
            {title}
          </h3>
          <p className="text-secondary/80 leading-relaxed text-base mb-8">
            {description}
          </p>
          <button
            type="button"
            className="inline-flex items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline w-fit"
            onClick={(e) => {
              e.stopPropagation()
              navigate(href)
            }}
          >
            Explore research <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
