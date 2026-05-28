import { NavLink, Outlet } from "react-router-dom"
import { Activity, Users, FlaskConical, Sun, Moon, Menu, X } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/hooks/useTheme"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import logo from "@/assets/logo.webp"

const navItems = [
  { to: "/",            label: "Overview",      icon: Activity },
  { to: "/disease",     label: "Disease Detail",icon: FlaskConical },
  { to: "/demographics",label: "Demographics",  icon: Users },
]

export default function AppLayout() {
  const { theme, toggle } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col bg-card border-r transition-all duration-300 z-20",
        sidebarOpen ? "w-56" : "w-14"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b min-h-[64px]">
          <img
            src={logo}
            alt="CSIR Logo"
            className="flex-shrink-0 w-7 h-7 object-contain"
          />
          {sidebarOpen && (
            <span className="font-bold text-sm leading-tight text-foreground">
              CSIR Disease<br />Dashboard
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="p-2 border-t">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(o => !o)} className="w-full">
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <h1 className="text-base font-semibold text-foreground">
              NTD &amp; Infectious Disease Surveillance
            </h1>
            <p className="text-xs text-muted-foreground">
              Council for Scientific and Industrial Research · Preview Data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              Demo Mode
            </span>
            <Button variant="ghost" size="icon" onClick={toggle} title="Toggle theme">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
