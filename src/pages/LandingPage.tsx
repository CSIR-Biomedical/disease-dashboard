import { useNavigate } from "react-router-dom"
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
import ScrollToTopFab from "@/components/ScrollToTopFab"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary selection:text-white">
      <SiteHeader fixed />

      <HeroSection />
      <AboutSection />
      <ResearchAreas />
      <StatsStrip />
      <PublicHealthImpact />
      <LatestNews />

      <section id="profiles" className="py-20 md:py-24 bg-[#f5f5f5] border-t border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
                People
              </p>
              <h2 className="font-['Merriweather',serif] text-3xl md:text-4xl font-bold text-secondary mb-4">
                Featured researchers
              </h2>
              <div className="w-16 h-0.5 bg-primary" />
            </div>
            <Button
              variant="outline"
              className="hidden md:flex border-secondary/25 text-secondary rounded-none shadow-none hover:bg-secondary hover:text-white"
              onClick={() => navigate("/researchers")}
            >
              View full directory
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {RESEARCHERS.slice(0, 3).map((researcher) => (
              <div
                key={researcher.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/researcher?id=${researcher.id}`)}
              >
                <div className="overflow-hidden mb-4 bg-slate-200 aspect-[4/5]">
                  <ImagePlaceholder
                    label="Photo"
                    className="bg-slate-200 group-hover:bg-slate-300 transition-colors"
                  />
                </div>
                <h4 className="font-['Merriweather',serif] font-bold text-lg text-secondary group-hover:text-primary transition-colors">
                  {researcher.name}
                </h4>
                <p className="text-sm text-slate-500 font-medium mt-1">{researcher.role}</p>
                <p className="text-xs text-slate-400 mt-0.5">{researcher.department}</p>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-10 md:hidden border-secondary/25 text-secondary rounded-none shadow-none"
            onClick={() => navigate("/researchers")}
          >
            View full directory
          </Button>
        </div>
      </section>

      <SiteFooter />
      <ScrollToTopFab />
    </div>
  )
}
