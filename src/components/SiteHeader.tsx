import { useEffect, useState, type MouseEvent } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import logoImg from "@/assets/logo.webp"
import ConstructionBanner from "@/components/ConstructionBanner"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-semibold whitespace-nowrap transition-colors",
    isActive ? "text-primary" : "text-slate-600 hover:text-primary"
  )

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "block w-full rounded-lg px-4 py-3 text-base font-semibold transition-colors",
    isActive ? "bg-primary/10 text-primary" : "text-slate-700 hover:bg-slate-100"
  )

interface SiteHeaderProps {
  fixed?: boolean
}

export default function SiteHeader({ fixed = false }: SiteHeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const onHome = location.pathname === "/"
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const goResearchAreas = (e: MouseEvent) => {
    if (onHome) {
      e.preventDefault()
      setMenuOpen(false)
      document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className={cn(
        "top-0 w-full z-50",
        fixed ? "fixed" : "sticky"
      )}
    >
      <ConstructionBanner />
      <nav className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 sm:gap-3 text-left shrink min-w-0 flex-1 mr-2"
              aria-label="Center for Health Research and Innovation — a CSIR center. Go to home."
            >
              <img src={logoImg} alt="" className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0" />
              <div className="flex flex-col min-w-0 gap-0.5">
                <span className="text-[10px] font-medium tracking-wide text-slate-500">
                 CSIR
                </span>
                <span className="font-['Merriweather',serif] font-bold text-secondary leading-snug text-[13px] sm:text-sm md:text-base lg:text-lg">
                  Center for Health Research and Innovation
                </span>
              </div>
            </button>

            <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  linkClass({ isActive: isActive && !location.hash })
                }
              >
                Home
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
              <NavLink
                to="/#research"
                className="text-sm font-semibold whitespace-nowrap transition-colors text-slate-600 hover:text-primary"
                onClick={goResearchAreas}
              >
                Research Areas
              </NavLink>
              <NavLink to="/publications" className={linkClass}>
                Publications
              </NavLink>
              <NavLink
                to="/researchers"
                className={({ isActive }) =>
                  linkClass({
                    isActive: isActive || location.pathname.startsWith("/researcher"),
                  })
                }
              >
                Researcher Profiles
              </NavLink>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-primary hover:bg-[#c40069] text-white shadow-md shrink-0"
              >
                Access Dashboard
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden shrink-0 w-12 h-12 rounded-lg text-secondary hover:bg-secondary/5 [&_svg]:!size-7"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="md:hidden fixed inset-0 z-40 bg-slate-950/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="md:hidden absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <NavLink to="/" end className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/about" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
              <NavLink
                to="/#research"
                className={mobileLinkClass({ isActive: false })}
                onClick={goResearchAreas}
              >
                Research Areas
              </NavLink>
              <NavLink to="/publications" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                Publications
              </NavLink>
              <NavLink
                to="/researchers"
                className={({ isActive }) =>
                  mobileLinkClass({
                    isActive: isActive || location.pathname.startsWith("/researcher"),
                  })
                }
                onClick={() => setMenuOpen(false)}
              >
                Researcher Profiles
              </NavLink>
              <Button
                onClick={() => {
                  setMenuOpen(false)
                  navigate("/dashboard")
                }}
                className="w-full mt-3 bg-primary hover:bg-[#c40069] text-white"
              >
                Access Dashboard
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
