import { Outlet } from "react-router-dom"
import SiteFooter from "@/components/SiteFooter"
import SiteHeader from "@/components/SiteHeader"
import ScrollToTopFab from "@/components/ScrollToTopFab"

export default function ProfilesLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <Outlet />
      </main>

      <SiteFooter />
      <ScrollToTopFab />
    </div>
  )
}
