import { useState } from "react"
import { ChevronRight } from "lucide-react"

interface ResearchAreaCardProps {
  title: string
  description: string
  imageSrc: string
}

export default function ResearchAreaCard({ title, description, imageSrc }: ResearchAreaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="group w-full cursor-pointer [perspective:1000px] h-[400px] lg:h-[450px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] shadow-lg hover:shadow-2xl rounded-xl transition-all ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
      >
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 pointer-events-none" />
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 p-8 z-20 flex justify-between items-end">
            <h3 className="font-['Merriweather',serif] text-3xl font-bold text-white drop-shadow-md">
              {title}
            </h3>
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              Click to flip
            </span>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center bg-white">
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="font-['Merriweather',serif] text-3xl font-bold text-secondary mb-6">
              {title}
            </h3>
            <p className="text-secondary/80 leading-relaxed text-lg mb-8 max-w-sm">
              {description}
            </p>
            <span className="font-semibold flex items-center text-base text-secondary bg-secondary/10 hover:bg-secondary/15 transition-colors px-6 py-3 rounded-full">
              Explore Research <ChevronRight className="w-5 h-5 ml-2" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
