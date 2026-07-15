import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import logoImg from "@/assets/logo.webp"
import ConstructionBanner from "@/components/ConstructionBanner"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-semibold whitespace-nowrap transition-colors",
    isActive ? "text-primary" : "text-slate-600 hover:text-primary"
  )

interface SiteHeaderProps {
  fixed?: boolean
}

export default function SiteHeader({ fixed = false }: SiteHeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const onHome = location.pathname === "/"

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
          <div className="flex justify-between h-20 items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-left shrink-0"
            >
              <img src={logoImg} alt="CSIR Logo" className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <span className="font-['Merriweather',serif] font-bold text-xl text-slate-900 leading-tight tracking-tight">
                  CSIR
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
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
                onClick={(e) => {
                  if (onHome) {
                    e.preventDefault()
                    document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })
                  }
                }}
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
          </div>
        </div>
      </nav>
    </div>
  )
}
