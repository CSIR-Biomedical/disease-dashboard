
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import Overview from "@/pages/Overview"
import DiseaseDetail from "@/pages/DiseaseDetail"
import Demographics from "@/pages/Demographics"
import ResearcherDetail from "@/pages/ResearcherDetail"
import Researchers from "@/pages/Researchers"

import { DiseaseTypeProvider } from "@/context/DiseaseTypeContext"
import { FilterProvider } from "@/context/FilterContext"

export default function App() {

  return (
    <DiseaseTypeProvider>
      <FilterProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index        element={<Overview />} />
              <Route path="disease"      element={<DiseaseDetail />} />
              <Route path="demographics" element={<Demographics />} />
              <Route path="researchers"  element={<Researchers />} />
              <Route path="researcher"   element={<ResearcherDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FilterProvider>
    </DiseaseTypeProvider>
  )
}

