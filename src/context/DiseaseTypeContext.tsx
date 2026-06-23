import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

export type DiseaseType = "communicable" | "non-communicable"

interface DiseaseTypeContextValue {
  diseaseType: DiseaseType
  setDiseaseType: (t: DiseaseType) => void
}

const DiseaseTypeContext = createContext<DiseaseTypeContextValue>({
  diseaseType: "communicable",
  setDiseaseType: () => {},
})

export function DiseaseTypeProvider({ children }: { children: ReactNode }) {
  const [diseaseType, setDiseaseType] = useState<DiseaseType>("communicable")
  return (
    <DiseaseTypeContext.Provider value={{ diseaseType, setDiseaseType }}>
      {children}
    </DiseaseTypeContext.Provider>
  )
}

export function useDiseaseType() {
  return useContext(DiseaseTypeContext)
}
