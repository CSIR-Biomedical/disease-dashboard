import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import logoImg from "@/assets/logo.webp"
import { RESEARCHERS } from "@/data/researchers"

import HeroSection from "@/components/landing/HeroSection"
import AboutSection from "@/components/landing/AboutSection"
import ResearchAreas from "@/components/landing/ResearchAreas"
import StatsStrip from "@/components/landing/StatsStrip"
import PublicHealthImpact from "@/components/landing/PublicHealthImpact"
import LatestNews from "@/components/landing/LatestNews"
import SiteFooter from "@/components/SiteFooter"
import ImagePlaceholder from "@/components/ImagePlaceholder"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 font-sans selection:bg-primary selection:text-white">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="CSIR Logo" className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <span className="font-['Merriweather',serif] font-bold text-xl text-slate-900 leading-tight tracking-tight">CSIR</span>
                <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">Center for Health Research and Innovation</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <button
                type="button"
                onClick={() => navigate("/about")}
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              >
                About
              </button>
              <a href="#research" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Research Areas</a>
              <button
                type="button"
                onClick={() => navigate("/publications")}
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              >
                Publications
              </button>
              <button
                type="button"
                onClick={() => navigate("/researchers")}
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              >
                Researcher Profiles
              </button>
              <Button onClick={() => navigate("/dashboard")} className="bg-primary hover:bg-[#c40069] text-white shadow-md">
                Access Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

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
