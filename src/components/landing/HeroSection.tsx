import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import heroImg from "@/assets/hero_background_1783948052252.png"

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden bg-[#1a153a]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a153a]/80 to-[#1a153a] pointer-events-none" />

      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <Badge className="bg-[#fce6f2] text-primary hover:bg-[#fce6f2] border-none mb-6 text-xs px-3 py-1 font-semibold uppercase tracking-wider">
          Council for Scientific and Industrial Research
        </Badge>
        <h1 className="font-['Merriweather',serif] text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
          Advancing Global Health Through Data-Driven Epidemiology
        </h1>
        <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          The CSIR Center for Health Research and Innovation is dedicated to monitoring, analyzing, and responding to emerging infectious diseases and chronic health conditions across the region.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" onClick={() => navigate("/dashboard")} className="bg-primary hover:bg-[#c40069] text-white font-semibold px-8 h-14 rounded-md shadow-lg shadow-primary/25 group text-base">
            Explore the Data Dashboard
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/publications")} className="border-slate-600 text-slate-200 hover:bg-white/5 hover:text-white font-semibold px-8 h-14 rounded-md bg-transparent text-base backdrop-blur-sm">
            View Our Publications
          </Button>
        </div>
      </div>
    </section>
  )
}
