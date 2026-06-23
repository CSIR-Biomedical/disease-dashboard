import { createContext, useContext, useState, ReactNode } from "react"

interface FilterContextValue {
  region: string
  setRegion: (r: string) => void
  district: string
  setDistrict: (d: string) => void
  timePeriod: string
  setTimePeriod: (t: string) => void
  resetFilters: () => void
}

const FilterContext = createContext<FilterContextValue>({
  region: "All Regions",
  setRegion: () => {},
  district: "All Districts",
  setDistrict: () => {},
  timePeriod: "This Year (2024)",
  setTimePeriod: () => {},
  resetFilters: () => {},
})

export function FilterProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState("All Regions")
  const [district, setDistrict] = useState("All Districts")
  const [timePeriod, setTimePeriod] = useState("This Year (2024)")

  const resetFilters = () => {
    setRegion("All Regions")
    setDistrict("All Districts")
    setTimePeriod("This Year (2024)")
  }

  return (
    <FilterContext.Provider
      value={{
        region,
        setRegion,
        district,
        setDistrict,
        timePeriod,
        setTimePeriod,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  return useContext(FilterContext)
}
