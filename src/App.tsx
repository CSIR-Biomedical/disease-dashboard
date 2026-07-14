
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import ProfilesLayout from "@/layouts/ProfilesLayout"
import Overview from "@/pages/Overview"
import DiseaseDetail from "@/pages/DiseaseDetail"
import Demographics from "@/pages/Demographics"
import ResearcherDetail from "@/pages/ResearcherDetail"
import Researchers from "@/pages/Researchers"
import About from "@/pages/About"
import Publications from "@/pages/Publications"
import PublicationDetail from "@/pages/PublicationDetail"
import LandingPage from "@/pages/LandingPage"

import { DiseaseTypeProvider } from "@/context/DiseaseTypeContext"
import { FilterProvider } from "@/context/FilterContext"

export default function App() {

  return (
    <DiseaseTypeProvider>
      <FilterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProfilesLayout />}>
              <Route path="/about" element={<About />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/publication" element={<PublicationDetail />} />
              <Route path="/researchers" element={<Researchers />} />
              <Route path="/researcher" element={<ResearcherDetail />} />
            </Route>
            <Route path="/dashboard" element={<AppLayout />}>
              <Route index               element={<Overview />} />
              <Route path="disease"      element={<DiseaseDetail />} />
              <Route path="demographics" element={<Demographics />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FilterProvider>
    </DiseaseTypeProvider>
  )
}

