import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import SiteFooter from "@/components/SiteFooter"
import logoImg from "@/assets/logo.webp"

export default function ProfilesLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 flex flex-col">
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-left"
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

            <div className="hidden md:flex space-x-8 items-center">
              <NavLink
                to="/"
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${
                    isActive ? "text-primary" : "text-slate-600 hover:text-primary"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/publications"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${
                    isActive ? "text-primary" : "text-slate-600 hover:text-primary"
                  }`
                }
              >
                Publications
              </NavLink>
              <NavLink
                to="/researchers"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${
                    isActive ? "text-primary" : "text-slate-600 hover:text-primary"
                  }`
                }
              >
                Researcher Profiles
              </NavLink>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-primary hover:bg-[#c40069] text-white shadow-md"
              >
                Access Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}
