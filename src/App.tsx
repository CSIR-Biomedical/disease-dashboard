import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import Overview from "@/pages/Overview"
import DiseaseDetail from "@/pages/DiseaseDetail"
import Demographics from "@/pages/Demographics"
import { SiteGate } from "@/components/SiteGate"

export default function App() {
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) {
    return <SiteGate onUnlock={() => setUnlocked(true)} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index        element={<Overview />} />
          <Route path="disease"      element={<DiseaseDetail />} />
          <Route path="demographics" element={<Demographics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
