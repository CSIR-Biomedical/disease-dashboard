export interface AgeGroup { group: string; male: number; female: number }
export interface RiskGroup { name: string; count: number; percentage: number }
export interface SexBreakdown { male: number; female: number }

// Swap with: await supabase.from("demographics").select("*").eq("disease_id", id)
export function getAgeDistribution(diseaseId?: string): AgeGroup[] {
  const factor = diseaseId ? (diseaseId.charCodeAt(0) % 4 + 7) / 10 : 1
  return [
    { group: "0–4",   male: Math.round(3200 * factor), female: Math.round(3050 * factor) },
    { group: "5–14",  male: Math.round(2800 * factor), female: Math.round(2650 * factor) },
    { group: "15–24", male: Math.round(4100 * factor), female: Math.round(3900 * factor) },
    { group: "25–34", male: Math.round(5200 * factor), female: Math.round(4950 * factor) },
    { group: "35–44", male: Math.round(4700 * factor), female: Math.round(4500 * factor) },
    { group: "45–54", male: Math.round(3600 * factor), female: Math.round(3400 * factor) },
    { group: "55–64", male: Math.round(2400 * factor), female: Math.round(2300 * factor) },
    { group: "65+",   male: Math.round(1800 * factor), female: Math.round(2100 * factor) },
  ]
}

// Risk groups are disease-specific for these four NTD/infectious diseases.
// _diseaseId reserved for full Supabase swap — currently returns disease-aware dummy data.
export function getRiskGroups(diseaseId?: string): RiskGroup[] {
  switch (diseaseId) {
    case "schistosomiasis":
      // Primarily affects school-age children and agricultural/fishing communities
      return [
        { name: "School-age children (5–14)", count: 8100,  percentage: 32 },
        { name: "Fishing communities",         count: 5600,  percentage: 22 },
        { name: "Agricultural workers",        count: 5100,  percentage: 20 },
        { name: "Pregnant women",              count: 3200,  percentage: 13 },
        { name: "General population",          count: 3300,  percentage: 13 },
      ]
    case "onchocerciasis":
      // Clusters around fast-flowing rivers; adult males in farming most exposed
      return [
        { name: "Adult males (15–49)",         count: 7200,  percentage: 35 },
        { name: "River-basin communities",     count: 5800,  percentage: 28 },
        { name: "Children under 15",           count: 4100,  percentage: 20 },
        { name: "Adult females (15–49)",       count: 3500,  percentage: 17 },
      ]
    case "covid19":
      return [
        { name: "Elderly (65+)",               count: 6800,  percentage: 28 },
        { name: "Immunocompromised",           count: 5200,  percentage: 21 },
        { name: "Healthcare workers",          count: 3900,  percentage: 16 },
        { name: "Chronic disease patients",    count: 4600,  percentage: 19 },
        { name: "General population",          count: 4000,  percentage: 16 },
      ]
    default: // malaria + overall
      return [
        { name: "Children under 5",            count: 9400,  percentage: 34 },
        { name: "Pregnant women",              count: 5200,  percentage: 19 },
        { name: "Non-immune travellers",       count: 3100,  percentage: 11 },
        { name: "Immunocompromised",           count: 4200,  percentage: 15 },
        { name: "General population",          count: 5800,  percentage: 21 },
      ]
  }
}

// Sex breakdown varies by disease epidemiology.
// _diseaseId reserved for full Supabase swap — currently returns disease-aware dummy data.
export function getSexBreakdown(diseaseId?: string): SexBreakdown {
  switch (diseaseId) {
    case "onchocerciasis":  return { male: 64, female: 36 } // higher male exposure via farming
    case "schistosomiasis": return { male: 56, female: 44 } // slight male skew
    case "covid19":         return { male: 54, female: 46 }
    default:                return { male: 52, female: 48 } // malaria / overall
  }
}
