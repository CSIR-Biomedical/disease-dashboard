import { NavLink, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import {
  LayoutDashboard, Sun, Moon, ChevronLeft, ChevronRight,
  ShieldAlert, HeartPulse, ChevronDown, Info, Users, Menu, X
} from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "@/hooks/useTheme"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useDiseaseType } from "@/context/DiseaseTypeContext"
import { DISEASES, getDiseasesByType } from "@/data/diseases"
import { GlobalSearch } from "@/components/GlobalSearch"

import logoImg from "@/assets/logo.webp"

export function MosquitoIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6v12M11 9h2M10 12h4" />
      <path d="M7 8c-1-1-3 0-3 2s2 3 3 2M17 8c1-1 3 0 3 2s-2 3-7 2" />
      <path d="M8 15l-3 2M16 15l3 2M9 11l-3-1M15 11l3-1" />
    </svg>
  )
}

const LG_QUERY = "(min-width: 1024px)"

export default function AppLayout() {
  const { theme, toggle } = useTheme()
  const { diseaseType, setDiseaseType } = useDiseaseType()
  const [isLg, setIsLg] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(LG_QUERY).matches : true
  )
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(LG_QUERY).matches : true
  )
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [communicableOpen, setCommunicableOpen] = useState(true)
  const [nonCommunicableOpen, setNonCommunicableOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(LG_QUERY)
    const onChange = () => {
      const matches = mq.matches
      setIsLg(matches)
      setSidebarOpen(matches)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (diseaseType === "communicable") {
      setCommunicableOpen(true)
    } else {
      setNonCommunicableOpen(true)
    }
  }, [diseaseType])

  // Close mobile drawer on navigation
  useEffect(() => {
    if (!isLg) setSidebarOpen(false)
  }, [location.pathname, location.search, isLg])

  const communicableDiseases = getDiseasesByType("communicable")
  const nonCommunicableDiseases = getDiseasesByType("non-communicable")
  const activeDiseaseId = searchParams.get("id")

  // Expanded labels on mobile drawer always; on desktop only when rail is open
  const showLabels = !isLg || sidebarOpen

  let activeTitle = "CSIR - Health Research and Innovation Center"
  let sectionLabel = "Tracking"
  let pageLabel = "Overview"

  if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
    activeTitle = "CSIR - Health Research and Innovation Center"
    sectionLabel = "Main"
    pageLabel = "Dashboard"
  } else if (location.pathname === "/dashboard/demographics" || location.pathname === "/demographics") {
    activeTitle = "Population Health Demographics"
    sectionLabel = "MAIN"
    pageLabel = "Population Health"
  } else if (location.pathname === "/dashboard/disease" || location.pathname === "/disease") {
    const currentDisease = DISEASES.find(d => d.id === activeDiseaseId) || communicableDiseases[0]
    activeTitle = currentDisease ? `${currentDisease.name} Tracking` : "Disease Tracking"
    sectionLabel = currentDisease?.diseaseType === "communicable" ? "Communicable Diseases" : "Non-Communicable Diseases"
    pageLabel = currentDisease ? currentDisease.name : "Disease Detail"
  }

  const navigateDisease = (id: string, type: "communicable" | "non-communicable") => {
    setDiseaseType(type)
    navigate(`/dashboard/disease?id=${id}`)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-800 dark:bg-slate-950 dark:text-slate-100">

        {/* Mobile backdrop */}
        {!isLg && sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={cn(
            "flex flex-col bg-[#1a153a] border-r border-slate-800 text-slate-300 transition-all duration-300 select-none",
            // Mobile: overlay drawer
            "fixed inset-y-0 left-0 z-40 w-64",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            // Desktop: in-flow rail
            "lg:static lg:translate-x-0 lg:z-20 lg:flex-shrink-0",
            isLg && sidebarOpen ? "lg:w-64" : "",
            isLg && !sidebarOpen ? "lg:w-16" : ""
          )}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800 min-h-[64px]">
            <div className="flex items-center gap-3 min-w-0">
              <img src={logoImg} alt="CSIR Logo" className="w-8 h-8 object-contain flex-shrink-0" />
              {showLabels && (
                <div className="leading-tight flex flex-col max-w-[170px]">
                  <span className="font-bold text-sm text-white tracking-wide leading-none">CSIR</span>
                  <span className="text-[10px] text-slate-400 mt-1 leading-snug">Health Research and Innovation Center</span>
                </div>
              )}
            </div>

            {/* Desktop collapse */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden lg:inline-flex flex-shrink-0 w-8 h-8 text-slate-400 hover:text-white hover:bg-slate-800"
                  onClick={() => setSidebarOpen(o => !o)}
                  aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                  {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-900 border-slate-700 text-white">
                {sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              </TooltipContent>
            </Tooltip>

            {/* Mobile close */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden flex-shrink-0 w-8 h-8 text-slate-400 hover:text-white hover:bg-slate-800"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={16} />
            </Button>
          </div>

          <nav className="flex-1 py-4 overflow-y-auto px-3 space-y-4">
            <div className="space-y-1.5">
              {showLabels && (
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2 block">
                  MAIN
                </span>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/dashboard"
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      (location.pathname === "/dashboard" || location.pathname === "/dashboard/")
                        ? "bg-[#E4007B] text-white font-medium shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                  >
                    <LayoutDashboard size={18} className="flex-shrink-0" />
                    {showLabels && <span>Dashboard</span>}
                  </NavLink>
                </TooltipTrigger>
                {!showLabels && <TooltipContent side="right">Dashboard</TooltipContent>}
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => navigate("/researchers")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-slate-400 hover:text-white hover:bg-slate-800/50"
                  >
                    <Users size={18} className="flex-shrink-0" />
                    {showLabels && <span>Researcher Profiles</span>}
                  </button>
                </TooltipTrigger>
                {!showLabels && <TooltipContent side="right">Researcher Profiles</TooltipContent>}
              </Tooltip>

              <div>
                <button
                  onClick={() => {
                    setCommunicableOpen(prev => !prev)
                    setDiseaseType("communicable")
                    if (isLg && !sidebarOpen) setSidebarOpen(true)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left",
                    diseaseType === "communicable"
                      ? "text-white font-medium bg-slate-800/40"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <ShieldAlert size={18} className="text-blue-400 flex-shrink-0" />
                    {showLabels && <span>Communicable Diseases</span>}
                  </div>
                  {showLabels && (
                    communicableOpen ? <ChevronDown size={14} className="opacity-60" /> : <ChevronRight size={14} className="opacity-60" />
                  )}
                </button>

                {communicableOpen && showLabels && (
                  <div className="pl-4 mt-1 space-y-1 border-l border-slate-800 ml-5 py-1">
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest pl-2 block mb-1">
                      Disease Registry
                    </span>
                    {communicableDiseases.map(d => {
                      const isActive = activeDiseaseId === d.id && location.pathname.includes("/disease")
                      return (
                        <button
                          key={d.id}
                          onClick={() => navigateDisease(d.id, "communicable")}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-all text-left",
                            isActive
                              ? "bg-[#E4007B] text-white font-medium shadow-sm"
                              : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                          )}
                        >
                          {d.id === "malaria" ? (
                            <MosquitoIcon className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-red-400")} />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                          )}
                          <span>{d.name}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => {
                    setNonCommunicableOpen(prev => !prev)
                    setDiseaseType("non-communicable")
                    if (isLg && !sidebarOpen) setSidebarOpen(true)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left",
                    diseaseType === "non-communicable"
                      ? "text-white font-medium bg-slate-800/40"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <HeartPulse size={18} className="text-purple-400 flex-shrink-0" />
                    {showLabels && <span>Non-Communicable</span>}
                  </div>
                  {showLabels && (
                    nonCommunicableOpen ? <ChevronDown size={14} className="opacity-60" /> : <ChevronRight size={14} className="opacity-60" />
                  )}
                </button>

                {nonCommunicableOpen && showLabels && (
                  <div className="pl-4 mt-1 space-y-1 border-l border-slate-800 ml-5 py-1">
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest pl-2 block mb-1">
                      Disease Registry
                    </span>
                    {nonCommunicableDiseases.map(d => {
                      const isActive = activeDiseaseId === d.id && location.pathname.includes("/disease")
                      return (
                        <button
                          key={d.id}
                          onClick={() => navigateDisease(d.id, "non-communicable")}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-all text-left",
                            isActive
                              ? "bg-[#E4007B] text-white font-medium shadow-sm"
                              : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                          )}
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                          <span>{d.name}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-3 sm:px-6 flex-shrink-0 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden flex-shrink-0 w-9 h-9 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={18} />
              </Button>

              <div className="min-w-0">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                  {activeTitle}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5 font-medium flex items-center gap-1.5 truncate">
                  <span className="hidden sm:inline">Council for Scientific and Industrial Research</span>
                  <span className="hidden sm:inline opacity-50">•</span>
                  <span className="text-blue-500 uppercase tracking-wider text-[10px] font-bold shrink-0">{sectionLabel}</span>
                  <span className="opacity-50">/</span>
                  <span className="text-slate-600 dark:text-slate-300 font-semibold truncate">{pageLabel}</span>
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 justify-center max-w-md mx-2 lg:mx-4 min-w-0">
              <GlobalSearch />
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <div className="md:hidden">
                <GlobalSearch variant="icon" />
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2 sm:px-2.5 py-1 rounded-full cursor-default select-none border dark:border-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="hidden sm:inline">Demo Mode</span>
                    <Info size={11} className="opacity-60" />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[220px] text-center bg-slate-900 text-white">
                  Synthetic preview data modeled for CSIR - Health Research and Innovation Center.
                </TooltipContent>
              </Tooltip>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                aria-label="Toggle color theme"
                className="w-9 h-9 text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 bg-[#f8fafc] dark:bg-slate-950">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
