import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import logoImg from "@/assets/logo.webp"
import ConstructionBanner from "@/components/ConstructionBanner"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-medium whitespace-nowrap transition-colors",
    isActive ? "text-primary" : "text-slate-600 hover:text-secondary"
  )

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "block w-full border-b border-slate-100 px-1 py-3.5 text-base font-medium transition-colors",
    isActive ? "text-primary" : "text-secondary hover:text-primary"
  )

const RESEARCH_LINKS = [
  { to: "/research", label: "Research Areas" },
  { to: "/researchers", label: "Researcher Profiles" },
] as const

interface SiteHeaderProps {
  fixed?: boolean
}

export default function SiteHeader({ fixed = false }: SiteHeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [researchOpen, setResearchOpen] = useState(false)
  const [mobileResearchOpen, setMobileResearchOpen] = useState(false)
  const researchRef = useRef<HTMLDivElement>(null)

  const researchActive =
    location.pathname === "/research" ||
    location.pathname.startsWith("/researcher")

  useEffect(() => {
    setMenuOpen(false)
    setResearchOpen(false)
    setMobileResearchOpen(false)
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

  useEffect(() => {
    if (!researchOpen) return
    const onPointer = (e: MouseEvent) => {
      if (!researchRef.current?.contains(e.target as Node)) {
        setResearchOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResearchOpen(false)
    }
    document.addEventListener("mousedown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [researchOpen])

  return (
    <div className={cn("top-0 w-full z-50", fixed ? "fixed" : "sticky")}>
      <ConstructionBanner />
      <nav className="w-full bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-[4.25rem] md:h-20">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-left min-w-0 flex-1 md:flex-none md:max-w-xl"
              aria-label="Center for Health Research and Innovation — a CSIR center. Go to home."
            >
              <img
                src={logoImg}
                alt=""
                className="w-10 h-10 object-contain shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-slate-500 mb-0.5">
                  A CSIR center
                </p>
                <p className="font-['Merriweather',serif] font-bold text-secondary text-[13px] leading-snug sm:text-sm md:text-base line-clamp-2">
                  Center for Health Research and Innovation
                </p>
              </div>
            </button>

            <div className="hidden md:flex items-center gap-7 lg:gap-8 shrink-0">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>

              <div className="relative" ref={researchRef}>
                <button
                  type="button"
                  onClick={() => setResearchOpen((o) => !o)}
                  aria-expanded={researchOpen}
                  aria-haspopup="menu"
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap transition-colors",
                    researchActive || researchOpen
                      ? "text-primary"
                      : "text-slate-600 hover:text-secondary"
                  )}
                >
                  Research
                  <ChevronDown
                    size={16}
                    className={cn("transition-transform", researchOpen && "rotate-180")}
                  />
                </button>

                {researchOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-3 min-w-[220px] border border-slate-200 bg-white py-1 shadow-md z-50"
                  >
                    {RESEARCH_LINKS.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        role="menuitem"
                        onClick={() => setResearchOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "block px-4 py-2.5 text-sm transition-colors",
                            isActive ||
                              (item.to === "/researchers" &&
                                location.pathname.startsWith("/researcher"))
                              ? "text-primary bg-primary/5 font-medium"
                              : "text-slate-600 hover:text-secondary hover:bg-[#f7f6f4]"
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/publications" className={linkClass}>
                Publications
              </NavLink>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-primary hover:bg-[#c40069] text-white rounded-sm px-4 h-10 text-sm font-semibold shadow-none"
              >
                Access Dashboard
              </Button>
            </div>

            <button
              type="button"
              className="md:hidden shrink-0 inline-flex items-center justify-center w-12 h-12 text-secondary"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={28} strokeWidth={1.75} /> : <Menu size={28} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="md:hidden fixed inset-0 z-40 bg-slate-950/35"
            onClick={() => setMenuOpen(false)}
          />
          <div className="md:hidden absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-5 py-2">
              <NavLink to="/" end className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/about" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                About
              </NavLink>

              <div className="border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => setMobileResearchOpen((o) => !o)}
                  aria-expanded={mobileResearchOpen}
                  className={cn(
                    "flex w-full items-center justify-between px-1 py-3.5 text-base font-medium",
                    researchActive || mobileResearchOpen ? "text-primary" : "text-secondary"
                  )}
                >
                  Research
                  <ChevronDown
                    size={18}
                    className={cn("transition-transform", mobileResearchOpen && "rotate-180")}
                  />
                </button>
                {mobileResearchOpen && (
                  <div className="pb-2 pl-3">
                    {RESEARCH_LINKS.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "block py-2.5 text-sm font-medium",
                            isActive ||
                              (item.to === "/researchers" &&
                                location.pathname.startsWith("/researcher"))
                              ? "text-primary"
                              : "text-slate-600"
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/publications" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                Publications
              </NavLink>
              <div className="py-4">
                <Button
                  onClick={() => {
                    setMenuOpen(false)
                    navigate("/dashboard")
                  }}
                  className="w-full bg-primary hover:bg-[#c40069] text-white rounded-sm h-11 font-semibold shadow-none"
                >
                  Access Dashboard
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
