
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import Overview from "@/pages/Overview"
import DiseaseDetail from "@/pages/DiseaseDetail"
import Demographics from "@/pages/Demographics"

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
            </Route>
          </Routes>
        </BrowserRouter>
      </FilterProvider>
    </DiseaseTypeProvider>
  )
}

