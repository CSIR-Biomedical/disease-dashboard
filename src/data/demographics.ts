export interface AgeGroup { group: string; male: number; female: number }
export interface RiskGroup { name: string; count: number; percentage: number }
export interface SexBreakdown { male: number; female: number }

// Swap with: await supabase.from("demographics").select("*").eq("disease_id", id)
export function getAgeDistribution(diseaseId?: string): AgeGroup[] {
  // NCDs skew heavily toward older age groups
  if (diseaseId === "hypertension" || diseaseId === "cardiovascular") {
    return [
      { group: "0–4",   male: 120,  female: 110  },
      { group: "5–14",  male: 200,  female: 190  },
      { group: "15–24", male: 850,  female: 820  },
      { group: "25–34", male: 2800, female: 2650 },
      { group: "35–44", male: 4900, female: 4750 },
      { group: "45–54", male: 6200, female: 6050 },
      { group: "55–64", male: 7100, female: 7300 },
      { group: "65+",   male: 5900, female: 6800 },
    ]
  }
  if (diseaseId === "diabetes") {
    return [
      { group: "0–4",   male: 80,   female: 70   },
      { group: "5–14",  male: 320,  female: 300  },
      { group: "15–24", male: 1100, female: 1050 },
      { group: "25–34", male: 3200, female: 3100 },
      { group: "35–44", male: 5100, female: 5000 },
      { group: "45–54", male: 6800, female: 6700 },
      { group: "55–64", male: 5900, female: 6100 },
      { group: "65+",   male: 4200, female: 4800 },
    ]
  }
  if (diseaseId === "sickle-cell") {
    // Genetic — present from birth, high mortality in young children
    return [
      { group: "0–4",   male: 4100, female: 3950 },
      { group: "5–14",  male: 3800, female: 3600 },
      { group: "15–24", male: 2900, female: 2750 },
      { group: "25–34", male: 2100, female: 2000 },
      { group: "35–44", male: 1400, female: 1350 },
      { group: "45–54", male: 800,  female: 780  },
      { group: "55–64", male: 350,  female: 340  },
      { group: "65+",   male: 150,  female: 180  },
    ]
  }

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

// Risk groups are disease-specific.
// _diseaseId reserved for full Supabase swap — currently returns disease-aware dummy data.
export function getRiskGroups(diseaseId?: string): RiskGroup[] {
  switch (diseaseId) {
    case "schistosomiasis":
      return [
        { name: "School-age children (5–14)", count: 8100, percentage: 32 },
        { name: "Fishing communities",         count: 5600, percentage: 22 },
        { name: "Agricultural workers",        count: 5100, percentage: 20 },
        { name: "Pregnant women",              count: 3200, percentage: 13 },
        { name: "General population",          count: 3300, percentage: 13 },
      ]
    case "onchocerciasis":
      return [
        { name: "Adult males (15–49)",         count: 7200, percentage: 35 },
        { name: "River-basin communities",     count: 5800, percentage: 28 },
        { name: "Children under 15",           count: 4100, percentage: 20 },
        { name: "Adult females (15–49)",       count: 3500, percentage: 17 },
      ]
    case "covid19":
      return [
        { name: "Elderly (65+)",               count: 6800, percentage: 28 },
        { name: "Immunocompromised",           count: 5200, percentage: 21 },
        { name: "Healthcare workers",          count: 3900, percentage: 16 },
        { name: "Chronic disease patients",    count: 4600, percentage: 19 },
        { name: "General population",          count: 4000, percentage: 16 },
      ]
    // ── NCDs ─────────────────────────────────────────────────────────────────
    case "hypertension":
      return [
        { name: "Adults 45–64",                count: 12400, percentage: 34 },
        { name: "Adults 65+",                  count: 9800,  percentage: 27 },
        { name: "Obese individuals (BMI>30)",  count: 7200,  percentage: 20 },
        { name: "Diabetics",                   count: 4100,  percentage: 11 },
        { name: "General population",          count: 2900,  percentage:  8 },
      ]
    case "diabetes":
      return [
        { name: "Adults 35–64",                count: 14200, percentage: 42 },
        { name: "Obese individuals (BMI>30)",  count: 8600,  percentage: 25 },
        { name: "Adults 65+",                  count: 6100,  percentage: 18 },
        { name: "Sedentary workers",           count: 3400,  percentage: 10 },
        { name: "General population",          count: 1700,  percentage:  5 },
      ]
    case "cardiovascular":
      return [
        { name: "Adults 55+",                  count: 16800, percentage: 45 },
        { name: "Hypertensive patients",       count: 9200,  percentage: 25 },
        { name: "Diabetics",                   count: 5600,  percentage: 15 },
        { name: "Smokers",                     count: 3700,  percentage: 10 },
        { name: "General population",          count: 1900,  percentage:  5 },
      ]
    case "sickle-cell":
      return [
        { name: "Children 0–14 (SS genotype)", count: 9200,  percentage: 38 },
        { name: "Adolescents 15–24",           count: 6400,  percentage: 26 },
        { name: "Pregnant women (SS)",         count: 4100,  percentage: 17 },
        { name: "Adults with complications",   count: 3200,  percentage: 13 },
        { name: "General population",          count: 1500,  percentage:  6 },
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
export function getSexBreakdown(diseaseId?: string): SexBreakdown {
  switch (diseaseId) {
    case "onchocerciasis":  return { male: 64, female: 36 } // higher male exposure via farming
    case "schistosomiasis": return { male: 56, female: 44 }
    case "covid19":         return { male: 54, female: 46 }
    case "hypertension":    return { male: 51, female: 49 } // near-equal, slightly male skew
    case "diabetes":        return { male: 49, female: 51 } // slight female skew in Ghana data
    case "cardiovascular":  return { male: 58, female: 42 } // male skew
    case "sickle-cell":     return { male: 50, female: 50 } // autosomal recessive, equal
    default:                return { male: 52, female: 48 }
  }
}
