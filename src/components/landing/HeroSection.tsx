import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import heroImg from "@/assets/hero_background_1783948052252.png"

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[78vh] md:min-h-[85vh] flex items-end overflow-hidden bg-[#1a153a]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a153a] via-[#1a153a]/75 to-[#1a153a]/35" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 md:pt-44 md:pb-24">
        <p className="text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-white/70 mb-5">
          Council for Scientific and Industrial Research
        </p>
        <h1 className="font-['Merriweather',serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-[1.15] mb-6">
          Science in service of public health
        </h1>
        <p className="text-base md:text-lg text-slate-200/90 max-w-xl leading-relaxed mb-10">
          The Center for Health Research and Innovation advances evidence-based responses to
          infectious and chronic disease across the region — from laboratory discovery to
          national surveillance.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            size="lg"
            onClick={() => navigate("/research")}
            className="bg-white text-secondary hover:bg-slate-100 font-semibold px-8 h-12 rounded-sm shadow-none text-base"
          >
            Explore our research
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/publications")}
            className="border-white/40 text-white hover:bg-white/10 hover:text-white font-semibold px-8 h-12 rounded-sm bg-transparent text-base"
          >
            Publications
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-white/80 hover:text-white hover:bg-white/10 font-medium px-4 h-12 rounded-sm text-base underline-offset-4 hover:underline"
          >
            Data platform
          </Button>
        </div>
      </div>
    </section>
  )
}
