import { NavLink, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import {
  LayoutDashboard, Sun, Moon, ChevronLeft, ChevronRight,
  ShieldAlert, HeartPulse, ChevronDown, Info
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

// Custom Mosquito SVG for Malaria
export function MosquitoIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6v12M11 9h2M10 12h4" />
      <path d="M7 8c-1-1-3 0-3 2s2 3 3 2M17 8c1-1 3 0 3 2s-2 3-7 2" />
      <path d="M8 15l-3 2M16 15l3 2M9 11l-3-1M15 11l3-1" />
    </svg>
  )
}

export default function AppLayout() {
  const { theme, toggle } = useTheme()
  const { diseaseType, setDiseaseType } = useDiseaseType()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  // Manage individual accordion open/close
  const [communicableOpen, setCommunicableOpen] = useState(true)
  const [nonCommunicableOpen, setNonCommunicableOpen] = useState(false)

  // Sync accordions when diseaseType changes externally
  useEffect(() => {
    if (diseaseType === "communicable") {
      setCommunicableOpen(true)
    } else {
      setNonCommunicableOpen(true)
    }
  }, [diseaseType])

  const communicableDiseases = getDiseasesByType("communicable")
  const nonCommunicableDiseases = getDiseasesByType("non-communicable")

  // Extract current disease ID from search params
  const activeDiseaseId = searchParams.get("id")

  // Breadcrumbs title and page path
  let activeTitle = "CSIR Disease Intelligence"
  let sectionLabel = "Tracking"
  let pageLabel = "Overview"

  if (location.pathname === "/") {
    activeTitle = "CSIR Disease Dashboard"
    sectionLabel = "Main"
    pageLabel = "Dashboard"
  } else if (location.pathname === "/demographics") {
    activeTitle = "Population Health Demographics"
    sectionLabel = "MAIN"
    pageLabel = "Population Health"
  } else if (location.pathname === "/disease") {
    const currentDisease = DISEASES.find(d => d.id === activeDiseaseId) || communicableDiseases[0]
    activeTitle = currentDisease ? `${currentDisease.name} Tracking` : "Disease Tracking"
    sectionLabel = currentDisease?.diseaseType === "communicable" ? "Communicable Diseases" : "Non-Communicable Diseases"
    pageLabel = currentDisease ? currentDisease.name : "Disease Detail"
  }



  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-800 dark:bg-slate-950 dark:text-slate-100">

        {/* ── Sidebar Redesign (GHSS Theme) ─────────────────────────────────── */}
        <aside className={cn(
          "flex flex-col bg-[#0b1329] border-r border-slate-800 text-slate-300 transition-all duration-300 z-20 flex-shrink-0 select-none",
          sidebarOpen ? "w-64" : "w-16"
        )}>

          {/* Sidebar Header Brand */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800 min-h-[64px]">
            <div className="flex items-center gap-3 min-w-0">
              <img src={logoImg} alt="CSIR Logo" className="w-8 h-8 object-contain flex-shrink-0" />
              {sidebarOpen && (
                <div className="leading-tight flex flex-col">
                  <span className="font-bold text-sm text-white tracking-wide">CSIR</span>
                  <span className="text-xs text-slate-400">Health Tracker</span>
                </div>
              )}
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 w-8 h-8 text-slate-400 hover:text-white hover:bg-slate-800"
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
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-4 overflow-y-auto px-3 space-y-4">

            {/* MAIN SECTION */}
            <div className="space-y-1.5">
              {sidebarOpen && (
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2 block">
                  MAIN
                </span>
              )}

              {/* Dashboard / Overview */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="/"
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      location.pathname === "/"
                        ? "bg-blue-600 text-white font-medium shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                  >
                    <LayoutDashboard size={18} className="flex-shrink-0" />
                    {sidebarOpen && <span>Dashboard</span>}
                  </NavLink>
                </TooltipTrigger>
                {!sidebarOpen && <TooltipContent side="right">Dashboard</TooltipContent>}
              </Tooltip>

              {/* Communicable Diseases Accordion */}
              <div>
                <button
                  onClick={() => {
                    setCommunicableOpen(prev => !prev)
                    setDiseaseType("communicable")
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left",
                    diseaseType === "communicable"
                      ? "text-white font-medium bg-slate-800/40"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <ShieldAlert size={18} className="text-blue-400" />
                    {sidebarOpen && <span>Communicable Diseases</span>}
                  </div>
                  {sidebarOpen && (
                    communicableOpen ? <ChevronDown size={14} className="opacity-60" /> : <ChevronRight size={14} className="opacity-60" />
                  )}
                </button>

                {/* Sub-menu registry for Communicable Diseases */}
                {communicableOpen && sidebarOpen && (
                  <div className="pl-4 mt-1 space-y-1 border-l border-slate-800 ml-5 py-1">
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest pl-2 block mb-1">
                      Disease Registry
                    </span>
                    {communicableDiseases.map(d => {
                      const isActive = activeDiseaseId === d.id && location.pathname === "/disease"
                      return (
                        <button
                          key={d.id}
                          onClick={() => {
                            setDiseaseType("communicable")
                            navigate(`/disease?id=${d.id}`)
                          }}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-all text-left",
                            isActive
                              ? "bg-blue-600 text-white font-medium shadow-sm"
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

              {/* Non-Communicable Diseases Accordion */}
              <div>
                <button
                  onClick={() => {
                    setNonCommunicableOpen(prev => !prev)
                    setDiseaseType("non-communicable")
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left",
                    diseaseType === "non-communicable"
                      ? "text-white font-medium bg-slate-800/40"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <HeartPulse size={18} className="text-purple-400" />
                    {sidebarOpen && <span>Non-Communicable</span>}
                  </div>
                  {sidebarOpen && (
                    nonCommunicableOpen ? <ChevronDown size={14} className="opacity-60" /> : <ChevronRight size={14} className="opacity-60" />
                  )}
                </button>

                {/* Sub-menu registry for Non-Communicable Diseases */}
                {nonCommunicableOpen && sidebarOpen && (
                  <div className="pl-4 mt-1 space-y-1 border-l border-slate-800 ml-5 py-1">
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest pl-2 block mb-1">
                      Disease Registry
                    </span>
                    {nonCommunicableDiseases.map(d => {
                      const isActive = activeDiseaseId === d.id && location.pathname === "/disease"
                      return (
                        <button
                          key={d.id}
                          onClick={() => {
                            setDiseaseType("non-communicable")
                            navigate(`/disease?id=${d.id}`)
                          }}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-all text-left",
                            isActive
                              ? "bg-blue-600 text-white font-medium shadow-sm"
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

        {/* ── Main Content Section ────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Topbar */}
          <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-6 flex-shrink-0 gap-4">

            {/* Left Header Title + Breadcrumb */}
            <div className="min-w-0">
              <h1 className="text-base font-bold text-slate-900 dark:text-white truncate">
                {activeTitle}
              </h1>
              {/* Breadcrumbs */}
              <p className="text-xs text-slate-400 mt-0.5 font-medium flex items-center gap-1.5">
                <span>Council for Scientific and Industrial Research</span>
                <span className="opacity-50">•</span>
                <span className="text-blue-500 uppercase tracking-wider text-[10px] font-bold">{sectionLabel}</span>
                <span className="opacity-50">/</span>
                <span className="text-slate-600 dark:text-slate-300 font-semibold">{pageLabel}</span>
              </p>
            </div>

            {/* Global Search */}
            <div className="hidden md:flex flex-1 justify-center max-w-md mx-4">
              <GlobalSearch />
            </div>

            {/* Right Header Controls (Theme, Demo indicator) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-full cursor-default select-none border dark:border-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Demo Mode
                    <Info size={11} className="opacity-60" />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[220px] text-center bg-slate-900 text-white">
                  Synthetic preview data modeled for CSIR Health Tracker.
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

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-[#f8fafc] dark:bg-slate-950">
            <Outlet />
          </main>

        </div>

      </div>
    </TooltipProvider>
  )
}
