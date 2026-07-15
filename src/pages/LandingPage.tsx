import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { RESEARCHERS } from "@/data/researchers"

import HeroSection from "@/components/landing/HeroSection"
import AboutSection from "@/components/landing/AboutSection"
import ResearchAreas from "@/components/landing/ResearchAreas"
import StatsStrip from "@/components/landing/StatsStrip"
import PublicHealthImpact from "@/components/landing/PublicHealthImpact"
import LatestNews from "@/components/landing/LatestNews"
import SiteFooter from "@/components/SiteFooter"
import SiteHeader from "@/components/SiteHeader"
import ImagePlaceholder from "@/components/ImagePlaceholder"

export default function LandingPage() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.hash !== "#research") return
    const t = window.setTimeout(() => {
      document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })
    }, 80)
    return () => window.clearTimeout(t)
  }, [location.hash])

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 font-sans selection:bg-primary selection:text-white">
      <SiteHeader fixed />

      <HeroSection />
      <AboutSection />
      <ResearchAreas />
      <StatsStrip />
      <PublicHealthImpact />
      <LatestNews />

      <section id="profiles" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-['Merriweather',serif] text-3xl md:text-4xl font-bold text-secondary mb-4">
                Featured Researchers
              </h2>
              <div className="w-20 h-1 bg-primary mb-4" />
            </div>
            <Button
              variant="outline"
              className="hidden md:flex border-slate-200"
              onClick={() => navigate("/researchers")}
            >
              View Full Directory
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESEARCHERS.slice(0, 3).map((researcher) => (
              <div
                key={researcher.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/researcher?id=${researcher.id}`)}
              >
                <div className="overflow-hidden rounded-md mb-4 bg-slate-100 aspect-[4/5]">
                  <ImagePlaceholder
                    label="Photo"
                    className="bg-slate-200 group-hover:bg-slate-300 transition-colors"
                  />
                </div>
                <h4 className="font-['Merriweather',serif] font-bold text-lg text-secondary group-hover:text-primary transition-colors">
                  {researcher.name}
                </h4>
                <p className="text-sm text-slate-500 font-medium">{researcher.role}</p>
                <p className="text-xs text-slate-400 mt-0.5">{researcher.department}</p>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-8 md:hidden border-slate-200"
            onClick={() => navigate("/researchers")}
          >
            View Full Directory
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
